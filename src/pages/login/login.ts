import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CareerType } from '../../career.interface';
import { SignPage } from '../sign/sign';
import { APIService } from '../../shared/services/api.service';
import { FileUploadOptions, FileTransferObject, FileTransfer } from '@ionic-native/file-transfer';
import { TipsController } from '../../shared/controller/tips/tips.controller';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private name: string = '';
  private author: string = '';
  private career: CareerType = CareerType.Finance;
  private groupPW: String = '';

  constructor(
    private transfer: FileTransfer,
    public navCtrl: NavController,
    public http: HttpClient,
    public tipsCtrl: TipsController,
    public alertCtrl: AlertController,
    public api: APIService) {
    console.log(this.transfer.create());
  }
  
  ionViewDidEnter() {

  }

  login() {
    this.api.get("assets/temp/login.json", { pw: this.groupPW }).subscribe((res: any) => {
      if (res.success) {
        this.navCtrl.setRoot(SignPage, {
          type: res.data.careerType,
          groupId: res.data.groupId
        });
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
