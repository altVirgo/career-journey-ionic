import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private showBg = 1;
  private scrollStart = false;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() {
    this.scrollStart = true;
    setTimeout(() => {
      this.showBg = 2;
    }, 15000);
    setTimeout(() => {
      this.showBg = 3;
    }, 30000);
    setTimeout(() => {
      this.showBg = 4;
    }, 45000);
    setTimeout(() => {
      this.showBg = 5;
    }, 60000);
    setTimeout(() => {
      this.showBg = 6;
    }, 85500);

    // setTimeout(()=>{
      this.navCtrl.setRoot(LoginPage);
    // }, 105000);
  }
}
