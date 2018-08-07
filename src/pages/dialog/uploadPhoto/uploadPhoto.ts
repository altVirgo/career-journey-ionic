import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController } from 'ionic-angular';

import * as _ from 'lodash';
import { FileUploadOptions, FileTransferObject, FileTransfer } from '@ionic-native/file-transfer';

import { TipsController } from '../../../shared/controller/tips/tips.controller';


@Component({
  selector: 'page-uploadPhoto',
  templateUrl: 'uploadPhoto.html'
})

export class UploadPhotoPage {

  public message: string = 'fsad';
  private memberList: any = [];
  private author: string = '';
  private name: string = '';
  private fileTransfer: FileTransferObject;
  private path: any;
  private type: string = '';

  constructor(

    public viewCtrl: ViewController,
    public navParams: NavParams,
    private transfer: FileTransfer,
    public tipsCtrl: TipsController,
    public alertCtrl: AlertController) {

    this.fileTransfer = this.transfer.create();
    this.type = this.viewCtrl.data.type;
    this.path = this.viewCtrl.data.img;
    this.memberList = this.viewCtrl.data.memberList;
  }

  ionViewDidEnter() {

  }

  initData() {
  }

  cancel() {
    this.viewCtrl.dismiss({
      status: -1
    });
  }

  ok() {
    const apiPath = "http://192.168.0.104:9090/api/commons/attach";
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.name + '.' + this.type,   //文件名称
      headers: {},
      // 如果要传参数，写这里
      params: {
        author: this.author,
      }
    };
    this.fileTransfer.upload(this.path, apiPath)
      .then((data) => {
        this.tipsCtrl.create({
          message: "上传成功",
          iconFontClass: 'icon-icon'
        })
        alert("success");
      }, (err) => {
        let alert = this.alertCtrl.create({
          title: '提示',
          message: err,
          buttons: ['确认']
        });
        alert.present();
      }).catch((err) => {
        console.log("err");
      });
  }
}
