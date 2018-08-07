import { Component } from '@angular/core';
import { ViewController, AlertController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera';

import * as _ from 'lodash';
import { ShowPhotoPage } from '../showPhoto/showPhoto';
import { UploadPhotoPage } from '../uploadPhoto/uploadPhoto';
import { FileUploadOptions, FileTransferObject, FileTransfer } from '@ionic-native/file-transfer';
import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions, CaptureVideoOptions } from '@ionic-native/media-capture';
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
  providers: [MediaCapture]
})
export class PhotoPage {

  private memberList: any;
  private options: CameraOptions;
  private imageData: any;
  constructor(
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private camera: Camera,
    public alertCtrl: AlertController,
    public mediaCapture: MediaCapture) {
    this.memberList = this.viewCtrl.data.memberList.member;
  }

  ionViewDidEnter() {
    this.options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  }

  cancel() {
    this.viewCtrl.dismiss({
      status: -1
    });
  }

  takePhotos(type) {
    this.viewCtrl.dismiss();
    switch (type) {
      case 0:
        this.options.sourceType = PictureSourceType.CAMERA;
        this.takePhoto();
        break;
      case 1:
        this.options.sourceType = PictureSourceType.SAVEDPHOTOALBUM;
        this.options.mediaType = this.camera.MediaType.VIDEO;
        this.takeVideo();
        break;
      case 2:
        this.options.sourceType = PictureSourceType.SAVEDPHOTOALBUM;
        this.takePhoto();
        break;
      default:
        break;
    }
  }

  takeVideo() {
    let options: CaptureVideoOptions = { limit: 1, duration: 2 };
    this.mediaCapture.captureVideo(options).then(
      (mediaFiles: MediaFile[]) => {
        alert();
        console.log(mediaFiles);
      },
      (err: CaptureError) => {
        alert(err);
        console.log(err);
      }
    );
  }

  takePhoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      console.log(imageData);
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      let base64Image = imageData;
      // let modalCtrl = this.modalCtrl.create(ShowPhotoPage, { img: base64Image }, { cssClass: "modal-show-photo" });
      // modalCtrl.onDidDismiss((data) => {
      // if (data && data.status === 1) {
      let modalCtrlUpLoad = this.modalCtrl.create(UploadPhotoPage, { img: base64Image, memberList: this.memberList, type: this.options.mediaType ? '3gp' : 'jpg' }, { cssClass: "modal-upload-photo" });
      modalCtrlUpLoad.present();
      // }
      // })
      // modalCtrl.present();
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: err.exception,
        buttons: ['确认']
      });
      alert.present();
    });

  }

}
