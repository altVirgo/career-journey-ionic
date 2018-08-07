import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
  private msgList: any = [];
  private curMsgIndex: any;

  constructor(public viewCtrl: ViewController) {
    this.msgList = this.viewCtrl.data.data;
    if (this.msgList.length > 0) {
      this.curMsgIndex = 0;
    }
  }

  ionViewDidEnter() {

  }

  toggleShow(index) {
    this.curMsgIndex = index;
  }
}
