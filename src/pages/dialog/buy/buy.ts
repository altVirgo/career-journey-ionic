import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { TipsController } from '../../../shared/controller/tips/tips.controller';

@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html'
})
export class BuyPage {

  private pw: String = '';
  private isGroup: Boolean = true;
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
    this.tipsCtrl.create({ iconFontClass: 'icon-icon', message: "买入成功" });
  }
}
