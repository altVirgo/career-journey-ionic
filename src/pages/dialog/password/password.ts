import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-password',
  templateUrl: 'password.html'
})
export class PasswordPage {

  private pw = '';
  private isGroup;
  constructor(public viewCtrl: ViewController) {
    this.isGroup = this.viewCtrl.data;
  }
  ionViewDidEnter() {

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  ok() {
    this.viewCtrl.dismiss({
      pw: this.pw
    });
  }
}
