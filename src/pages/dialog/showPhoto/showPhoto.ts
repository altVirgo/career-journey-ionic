import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera';

import * as _ from 'lodash';
@Component({
  selector: 'page-showPhoto',
  templateUrl: 'showPhoto.html'
})
export class ShowPhotoPage {

  private imageData: any;
  constructor(public viewCtrl: ViewController, public navParams: NavParams, private camera: Camera) {
    this.imageData = this.viewCtrl.data.img || "assets/imgs/login/bg.png";
  }

  ionViewDidEnter() {

  }

  cancel() {
    this.viewCtrl.dismiss({
      status: -1
    });
  }

  ok() {
    this.viewCtrl.dismiss({
      status: 1,
      data: {
        file: this.imageData
      }
    });
  }
}
