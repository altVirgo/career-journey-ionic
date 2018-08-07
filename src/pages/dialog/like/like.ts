import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-like',
  templateUrl: 'like.html'
})
export class LikePage {

  private text: string = '';
  private isGroup = true;
  constructor(public viewCtrl: ViewController,
    public toastCtrl: ToastController
  ) {
    this.isGroup = this.viewCtrl.data;
  }
  ionViewDidEnter() {

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  ok() {
    this.viewCtrl.dismiss(this.text);
  }
}
