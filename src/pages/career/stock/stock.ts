import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ViewController, ModalController, AlertController } from 'ionic-angular';
import { APIService } from '../../../shared/services/api.service';
import { TipsController } from '../../../shared/controller/tips/tips.controller';

import { BuyPage } from '../../dialog/buy/buy';
import { SellPage } from '../../dialog/sell/sell';

import * as _ from "lodash";
import { MessagePage } from '../../dialog/message/message';
@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html'
})
export class StockPage implements OnInit {
  @Input() groupId;
  @Input() data;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();
  @Input() remainTime;
  @Output() remainTimeChange: EventEmitter<any> = new EventEmitter();
  @Input() curRound;
  @Output() curRoundChange: EventEmitter<any> = new EventEmitter();
  @Output() trade: EventEmitter<any> = new EventEmitter();
  private remainTimer: any;
  private canSubmit: Boolean = false;
  private totalRound = 5;            // 一共需要交易多少轮才显示结果
  private canTrade: Boolean = false; // 是否可以交易
  private profit: any; // 盈利
  constructor(
    public viewCtrl: ViewController,
    public api: APIService,
    public tipsCtrl: TipsController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
    if (!this.data.finished) {
      this.startCountDown();
    }
  }

  /*
  * 股票交易
  */
  // 提交股票
  submitStock() {
    this.tipsCtrl.create({ iconFontClass: 'icon-jiaoyiguanli', message: "交易中...", duration: 3000 });
    clearInterval(this.remainTimer);
    setTimeout(() => {
      if (this.curRound < this.totalRound) {
        this.remainTime = 60 * 2;
        this.curRound++;
        this.startCountDown();
        this.canTrade = false;
        this.trade.emit();
      } else {
        this.data.finished = true;
        this.getStockResult();
      }
    }, 3000);
    this.emitData();
  }

  getStockResult() {
    this.api.get('assets/temp/stockResult.json', {
      groupId: this.groupId
    }).subscribe((res) => {
      this.data.stockInfo = _.extend(this.data.stockInfo, res);
    })
  }

  // 买入股票
  buyStock(stockId) {
    let modalCtrl = this.modalCtrl.create(BuyPage, {}, { cssClass: 'modal-buy' });
    modalCtrl.onDidDismiss((amount) => {
      this.api.get('assets/temp/buyStock.json', {
        groupId: this.groupId,
        amount: amount
      }).subscribe((res: any) => {
        if (res.success) {
          this.data.stockInfo.stockList.map((ele, idx) => {
            if (ele.id === stockId) {
              this.data.stockInfo.stockList[idx].buyed = true;
            }
          })
          this.checkCanTrade();
          this.emitData();
        } else {
          let alert = this.alertCtrl.create({
            title: '提示',
            message: res.info,
            buttons: ['确认']
          });
          alert.present();
        }
      })
    })
    modalCtrl.present();
  }

  // 卖出股票
  sellStock(stockId) {
    let modalCtrl = this.modalCtrl.create(SellPage, {}, { cssClass: 'modal-sell' })
    modalCtrl.onDidDismiss((amount) => {
      this.api.get('assets/temp/buyStock.json', {
        groupId: this.groupId,
        amount: amount
      }).subscribe((res: any) => {
        if (res.success) {
          this.data.stockInfo.stockList.map((ele, idx) => {
            if (ele.id === stockId) {
              this.data.stockInfo.stockList[idx].selled = true;
            }
          })
          this.checkCanTrade();
          this.emitData();
        } else {
          let alert = this.alertCtrl.create({
            title: '提示',
            message: res.info,
            buttons: ['确认']
          });
          alert.present();
        }
      })
    })
    modalCtrl.present();
  }

  // 推荐股票
  recommendStock(stockId) {
    this.api.get('assets/temp/buyStock.json', {
      groupId: this.groupId,
      stockId: stockId
    }).subscribe((res: any) => {
      if (res.success) {
        this.tipsCtrl.create({ iconFontClass: 'icon-icon', message: "推荐成功" });
      } else {
        let alert = this.alertCtrl.create({
          title: '提示',
          message: res.info,
          buttons: ['确认']
        });
        alert.present();
      }
    })
  }

  // 查看股票消息
  scanStockMsg(stockId) {
    this.api.get('assets/temp/msgList.json', { id: stockId }).subscribe((res: any) => {
      let modalCtrl = this.modalCtrl.create(MessagePage, { data: res.data }, { cssClass: "modal-memberMsg" });
      modalCtrl.present();
    })
  }

  // 检查是否满足交易条件 （每只股票必须有一次操作）
  checkCanTrade() {
    let flag = true;
    this.data.stockInfo.stockList.map((ele, idx) => {
      if (!ele.selled && !ele.buyed) {
        flag = false;
      }
    });
    this.canTrade = flag;
  }

  // 股票交易倒计时开始
  startCountDown() {
    this.remainTimer = setInterval(() => {
      if (this.remainTime >= 1) {
        this.remainTime--;
      } else {
        this.submitStock();
      }
      this.emitData();
    }, 1000);
  }

  // 股票交易倒计时暂停
  pauseCountDown() {
    clearInterval(this.remainTimer);
  }

  filterProfit(profit) {
    return profit >= 0 ? "+" + profit : profit;
  }

  emitData() {
    this.remainTimeChange.emit(this.remainTime);
    this.dataChange.emit(this.data);
    this.curRoundChange.emit(this.curRound);
  }
}
