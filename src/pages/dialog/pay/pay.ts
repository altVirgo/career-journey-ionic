import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';
import { TipsController } from '../../../shared/controller/tips/tips.controller';
import { APIService } from '../../../shared/services/api.service';

@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html'
})
export class PayPage {

  private pw = '';
  private money;
  private isGroup = true;
  private groupId;
  constructor(public viewCtrl: ViewController,
    public tipsCtrl: TipsController,
    private api: APIService,
    private alertCtrl: AlertController
  ) {
    this.isGroup = this.viewCtrl.data.isGroup;
    this.groupId = this.viewCtrl.data.groupId;
  }
  ionViewDidEnter() {

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  ok() {
    this.api.get('assets/temp/buyStock.json', {
      fromPW: this.pw,
      toID: this.groupId,
      payType: (this.isGroup ? 0 : 1),
      money: this.money
    }).subscribe((res: any) => {
      if (res.success) {
        this.viewCtrl.dismiss();
        this.tipsCtrl.create({ iconFontClass: 'icon-icon', message: "支付成功" });
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
}
