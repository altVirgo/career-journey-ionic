import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { TipsController } from '../../../shared/controller/tips/tips.controller';

@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html'
})
export class SellPage {

  private pw = '';
  private isGroup = true;
  constructor(public viewCtrl: ViewController,
    public tipsCtrl: TipsController
  ) {
    this.isGroup = this.viewCtrl.data;
  }
  ionViewDidEnter() {

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  ok() {
    this.viewCtrl.dismiss();
    this.tipsCtrl.create({ iconFontClass: 'icon-icon', message: "卖出成功" });
  }
}
