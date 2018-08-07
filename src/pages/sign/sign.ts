import { Component } from '@angular/core';
import { Platform, App, NavController, NavParams, ModalController, AlertController, Tabs } from 'ionic-angular';
import { PasswordPage } from '../dialog/password/password';
import { PWType } from '../../career.interface';
import { VideoPage } from './../video/video';
import { APIService } from '../../shared/services/api.service';

@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html'
})
export class SignPage {
  private type;
  private groupId;
  private memberList: any = [];
  private backButtonPressed: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: APIService,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public platform: Platform,
    public appCtrl: App
  ) {
    this.type = navParams.get('type');
    this.groupId = navParams.get('groupId');
    this.platform.ready().then(() => {
      this.registerBackButtonAction();
    })
  }


  ionViewWillEnter() {
    this.initData();
  }

  registerBackButtonAction(): void {

    //registerBackButtonAction是系统自带的方法
    this.platform.registerBackButtonAction((e) => {
      debugger;
      //获取NavController
      let activeNav: NavController = this.appCtrl.getActiveNavs()[0];
      //如果可以返回上一页，则执行pop
      // if (activeNav.canGoBack()) {
      //   activeNav.pop();
      // } else {
      //   // if (tabRef == null || tabRef._selectHistory[tabRef._selectHistory.length - 1] === tabRef.getByIndex(0).id) {
      //   //   //执行退出
      //   //   // this.showExit();
      //   // } else {
      //   //   //选择首页第一个的标签
      //   //   // tabRef.select(0);
      //   // }
      // }
      this.backButtonPressed = false;
    });
  }

  // 初始化数据
  initData() {
    this.api.get('assets/temp/groupInfo.json', {
      groupId: this.groupId
    }).subscribe((res: any) => {
      this.memberList = res;
    })
  }

  // 点击签到按钮
  checkOne(item, index) {
    let modalCtrl = this.modalCtrl.create(PasswordPage, { data: PWType.personal }, { cssClass: 'modal-pw' });
    modalCtrl.onDidDismiss((data) => {
      if (data) {
        this.api.get('assets/temp/signInmember.json', {
          id: item.id,
          pw: data.pw
        }).subscribe((res: any) => {
          if (res.success) {
            this.memberList[index].checked = true;
            this.memberList[index].time = res.time;
            if (this.checkAll()) {
              this.navCtrl.setRoot(VideoPage, {
                type: this.type,
                groupId: this.groupId
              });
            }
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
    })
    modalCtrl.present();
  }

  // 老师确认
  teacherCheck() {
    let modalCtrl = this.modalCtrl.create(PasswordPage, { data: PWType.personal }, { cssClass: 'modal-pw' });
    modalCtrl.onDidDismiss((data) => {
      if (data) {
        this.api.get('assets/temp/signInTeacher.json', {
          pw: data.pw
        }).subscribe((res: any) => {
          if (res.success) {
            this.navCtrl.setRoot(VideoPage, {
              type: this.type,
              groupId: this.groupId
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
    })
    modalCtrl.present();
  }

  // 检查是否所有人已签到
  checkAll() {
    let flag = true;
    this.memberList.map((ele) => {
      if (!ele.checked) {
        flag = false;
      }
    })
    return flag;
  }
}
