import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, ToastController } from 'ionic-angular';
import { CareerType, TaskType, FuncType, PWType } from '../../career.interface';
import { PasswordPage } from '../dialog/password/password';
import { PayPage } from '../dialog/pay/pay';
import { LikePage } from '../dialog/like/like';
import { TipsController } from '../../shared/controller/tips/tips.controller';

import { StatusType } from './questions/questions';
import { PhotoPage } from '../dialog/photo/photo';
import { APIService } from '../../shared/services/api.service';
import * as _ from "lodash";
import { MessagePage } from './../dialog/message/message';
@Component({
  selector: 'page-career',
  templateUrl: 'career.html'
})
export class CareerPage {
  private className: String;      // html的class名称
  private type: CareerType;       // 职业
  private groupId;
  private curTime = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10);   // 虚拟时间

  // 各个职业的场景，用于左上角的欢迎语后
  private scenesList = [
    "高级加工中心",
    "股票交易中心",
    "婚礼策划公司",
    "人才培训中心",
    "娱乐文化公司",
    "保险公司",
    "营养餐饮公司",
    "政府公共事务局",
    "服装设计工作室",
    "建筑设计院",
    "KEEP健身房",
    "旅游公司",
    "演播室",
    "眼科康复科室",
    "足球俱乐部"
  ]

  // banner
  private bannerList = [];

  private TVList = [];
  private videoTarget: any;
  private broadcastTarget: any;   // 广播音频DOM
  private marqueeTarget: any;     // 广播轮播DOM
  private msgList = [
    '播放及时滚动消息播放及时滚动消息1',
    '播放及时滚动消息播放及时滚动消息2',
    '播放及时滚动消息播放及时滚动消息3',
    '播放及时滚动消息播放及时滚动消息4',
    '播放及时滚动消息播放及时滚动消息5',
    '播放及时滚动消息播放及时滚动消息6'
  ]

  // 组员信息
  private groupInfo: any;
  private callAngelTarget: any;   // 呼叫天使的音频DOM

  // 某个组员的个人信息
  private memberMsg: any;

  // 任务
  private taskList: any = [
    {
      taskId: 1,
      name: "任务1",
      depend: null,
      finished: false,
      taskType: TaskType.Normal,
      description: `热爱文化娱乐的小伙伴们，你们好！在未来的一段时间里，你们的任务来了，请按照以下流程完成你们的各项操作哟！
1.你们已经开设了自己歌唱中心，现在请熟悉你们的设备。检查设备是否可以正常运行。你们的平板电脑可以在每次付费后自动切换到桌面，
2.请打开“全民K歌”软件，请带上耳机自己试录一首歌并上传到系统，如果一切正常，你们就可以开始服务了
3.请为你们的K歌服务制定一个价格，目前城市的娱乐一次的平均参考收费大约在一次50元左右（收费按股份分给你们个人账户），注意只有付费之后系统才能打开开始服务，10分钟内消费者必须唱完，然后系统会自动关闭。
4.你可以采用任何合理的方式拉拢顾客到你中心进行唱歌消费。顾客越多你的利润就越多。
注意：
①要考虑顾客意愿，禁止强买强卖，否则会适得其反哟。
②在服务过程中请考虑你的服务态度，产品价格，顾客需求等多种因素。

每一首歌都请协助消费者保存到本机，然后利用系统内上传按钮上传到系统中，并请记录下歌唱者的名字。
5.联合举办一场青年歌手大赛。
甲.需要的流程新人支付给你们，政府再补贴到其个人账户）。`,
      functions: [
        {
          functionId: 1,
          text: "支付",
          type: FuncType.PersonalPay
        }, {
          functionId: 1,
          text: "点赞",
          type: FuncType.Like
        }, {
          functionId: 1,
          text: "拍照上传",
          type: FuncType.TakePic
        }
      ]
    },
    {
      taskId: 2,
      name: "任务2",
      taskType: TaskType.Normal,
      description: `热爱文化娱乐的小伙伴们，你们好！在未来的一段时间里，你们的任务来了，请按照以下流程完成你们的各项操作哟！
      1.你们已经开设了自己歌唱中心，现在请熟悉你们的设备。检查设备是否可以正常运行。你们的平板电脑可以在每次付费后自动切换到桌面，
      2.请打开“全民K歌”软件，请带上耳机自己试录一首歌并上传到系统，如果一切正常，你们就可以开始服务了
      3.请为你们的K歌服务制定一个价格，目前城市的娱乐一次的平均参考收费大约在一次50元左右（收费按股份分给你们个人账户），注意只有付费之后系统才能打开开始服务，10分钟内消费者必须唱完，然后系统会自动关闭。
      4.你可以采用任何合理的方式拉拢顾客到你中心进行唱歌消费。顾客越多你的利润就越多。
      注意：
        ①要考虑顾客意愿，禁止强买强卖，否则会适得其反哟。
        ②在服务过程中请考虑你的服务态度，产品价格，顾客需求等多种因素。
      
      每一首歌都请协助消费者保存到本机，然后利用系统内上传按钮上传到系统中，并请记录下歌唱者的名字。
      5.联合举办一场青年歌手大赛。
      甲.需要的流程新人支付给你们，政府再补贴到其个人账户）。`,
      functions: [

      ],
      depend: 1,
      finished: false
    },
    {
      taskId: 3,
      name: "任务3",
      taskType: TaskType.StockTrade,
      stockInfo: {
        name: "未来基金",
        raiseAmount: 3389,
        totalValue: 12306,
        totalMarketValue: 10000,
        availableAmount: 4268,
        ratio: -23,
        rank: 6,
        stockList: [{
          id: '1',
          name: "娱乐传媒股份",
          total: 100,
          averagePrice: 3.2,
          ratio: -13,
          curPrice: 6.5,
          msgNum: 12
        }, {
          id: '2',
          name: "教育发展股份",
          total: 100,
          averagePrice: 3.2,
          ratio: -13,
          curPrice: 6.5,
          msgNum: 12
        }, {
          id: '3',
          name: "娱乐传媒股份",
          total: 100,
          averagePrice: 3.2,
          ratio: 13,
          curPrice: 6.5,
          msgNum: 12
        }, {
          id: '4',
          name: "教育发展股份",
          total: 100,
          averagePrice: 3.2,
          ratio: -13,
          curPrice: 6.5,
          msgNum: 12
        }, {
          id: '5',
          name: "娱乐传媒股份",
          total: 100,
          averagePrice: 3.2,
          ratio: -13,
          curPrice: 6.5,
          msgNum: 12
        }, {
          id: '6',
          name: "教育发展股份",
          total: 100,
          averagePrice: 3.2,
          ratio: -13,
          curPrice: 6.5,
          msgNum: 12
        }, {
          id: '7',
          name: "娱乐传媒股份",
          total: 100,
          averagePrice: 3.2,
          ratio: 13,
          curPrice: 6.5,
          msgNum: 12
        }]
      },
      depend: null,
      finished: false
    },
    {
      taskId: 4,
      name: "任务4",
      taskType: TaskType.Marry,
      depend: null,
      finished: false
    }, {
      taskId: 5,
      name: "任务5",
      taskType: TaskType.Exam,
      description: `热爱文化娱乐的小伙伴们，你们好！在未来的一段时间里，你们的任务来了，请按照以下流程完成你们的各项操作哟！
      1.你们已经开设了自己歌唱中心，现在请熟悉你们的设备。检查设备是否可以正常运行。你们的平板电脑可以在每次付费后自动切换到桌面，
      2.请打开“全民K歌”软件，请带上耳机自己试录一首歌并上传到系统，如果一切正常，你们就可以开始服务了
      3.请为你们的K歌服务制定一个价格，目前城市的娱乐一次的平均参考收费大约在一次50元左右（收费按股份分给你们个人账户），注意只有付费之后系统才能打开开始服务，10分钟内消费者必须唱完，然后系统会自动关闭。
      4.你可以采用任何合理的方式拉拢顾客到你中心进行唱歌消费。顾客越多你的利润就越多。
      注意：
        ①要考虑顾客意愿，禁止强买强卖，否则会适得其反哟。
        ②在服务过程中请考虑你的服务态度，产品价格，顾客需求等多种因素。
      
      每一首歌都请协助消费者保存到本机，然后利用系统内上传按钮上传到系统中，并请记录下歌唱者的名字。
      5.联合举办一场青年歌手大赛。
      甲.需要的流程新人支付给你们，政府再补贴到其个人账户）。`,
      functions: [

      ],
      depend: null,
      finished: false
    }
  ]
  private curTask = this.taskList[0];  // 当前任务


  private remainTime = 60 * 2;       // 股票交易剩余时间
  private curRound = 1;              // 当前交易第几轮


  // 呼叫天使
  private calling = false;
  private duration = 1000;   // 呼叫天使时，按钮闪动的时间

  // 结婚人信息
  private couple = [];

  private questionStatus: StatusType = StatusType.Before;
  private questionRemainTime = 60 * 10;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public api: APIService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public tipsCtrl: TipsController
  ) {
    this.type = navParams.get('type');
    this.groupId = navParams.get('groupId');
    this.className = this.getClass();
  }

  ionViewWillEnter() {
    this.initData();
  }

  ionViewDidEnter() {
    this.videoTarget = document.getElementById('future-TV');
    this.broadcastTarget = document.getElementById('audio-broadcast');
    this.callAngelTarget = document.getElementById('audio-call-angel');
    this.marqueeTarget = document.getElementById('marquee-container');
  }

  // 根据职业的类型获取className;用于显示不用的职业显示样式
  getClass() {
    let className = '';
    switch (parseInt(this.type.toString())) {
      case CareerType.Engineer:
        className = 'skin-engineer';
        break;
      case CareerType.Finance:
        className = 'skin-finance';
        break;
      case CareerType.Wedding:
        className = 'skin-wedding';
        break;
      case CareerType.Training:
        className = 'skin-training';
        break;
      case CareerType.Entertainment:
        className = 'skin-entertainment';
        break;
      case CareerType.Actuaries:
        className = 'skin-actuaries';
        break;
      case CareerType.Engineer:
        className = 'skin-Catering';
        break;
      case CareerType.Catering:
        className = 'skin-catering';
        break;
      case CareerType.Public:
        className = 'skin-public';
        break;
      case CareerType.Design:
        className = 'skin-design';
        break;
      case CareerType.Architectural:
        className = 'skin-architectural';
        break;
      case CareerType.Fitness:
        className = 'skin-fitness';
        break;
      case CareerType.Tourism:
        className = 'skin-tourism';
        break;
      case CareerType.Media:
        className = 'skin-media';
        break;
      case CareerType.Medical:
        className = 'skin-medical';
        break;
      case CareerType.Football:
        className = 'skin-football';
        break;
      default:
        break;
    }
    return className;
  }

  initData() {
    this.initBaseData();
    this.initTVData();
    this.initGroupData();
    this.initTaskData();
  }

  // 获取基础数据并显示
  initBaseData() {
    this.api.get('assets/temp/careerBaseInfo.json', {
      careerType: this.type
    }).subscribe((res: any) => {
      this.curTime = res.time;
      this.bannerList = res.bannerUrl;
    })
  }

  // 获取TV数据并显示
  initTVData() {
    this.api.get('assets/temp/TVList.json').subscribe((res: any) => {
      this.TVList = res;
      this.TVList[0].active = true;
    })
  }

  // 获取组员数据并显示
  initGroupData() {
    this.api.get('assets/temp/memberInfo.json', {
      groupId: this.groupId
    }).subscribe((res: any) => {
      this.groupInfo = res;
    })
  }

  // 获取任务数据并显示
  initTaskData() {
    this.api.get('assets/temp/taskInfo.json', {
      groupId: this.groupId
    }).subscribe((res: any) => {
      this.taskList = res;
      this.curTask = _.extend({}, this.taskList[0]);
      this.taskList.map((ele, idx) => {
        if (ele.taskType === TaskType.StockTrade) {
          this.initDataStock(idx);
        }
      })
    })
  }

  // 获取股票数据
  initDataStock(idx) {
    this.api.get("assets/temp/stockInfo.json", {
      taskId: this.curTask.taskId
    }).subscribe((res) => {
      this.taskList[idx].stockInfo = res;
    })
  }

  // 切换TV
  changeTV(url, idx) {
    this.videoTarget.src = url;
    this.videoTarget.canplay = () => {
      this.videoTarget.play();
    }
    this.TVList.map((ele, index) => {
      this.TVList[index].active = false;
    })
    this.TVList[idx].active = true;
  }

  // 有新广播
  newBroadcast(msg) {
    this.marqueeTarget.stop();
    this.marqueeTarget.start();
    this.msgList.unshift(msg || "您有一条新消息");
  }

  // 切换任务
  changeTask(taskInfo, index) {
    // temp start
    // 不是金融行业的不能查看任务3 
    if (this.type.toString() !== CareerType.Finance.toString() && taskInfo.taskType === TaskType.StockTrade) {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: '请先完成1',
        buttons: ['确认']
      });
      alert.present();
      return;
    }
    // 不是婚礼行业的不能查看任务4
    if (this.type.toString() !== CareerType.Wedding.toString() && taskInfo.taskType === TaskType.Marry) {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: '请先完成1',
        buttons: ['确认']
      });
      alert.present();
      return;
    }
    // temp end
    if (taskInfo.depend) {
      this.taskList.map((ele, idx) => {
        if (taskInfo.depend === ele.taskId) {
          if (ele.finished) {
            this.curTask = _.cloneDeep(taskInfo);
            this.curTask.index = index;
          } else {
            let alert = this.alertCtrl.create({
              title: '提示',
              message: '请先完成' + ele.name,
              buttons: ['确认']
            });
            alert.present();
          }
        }
      });
    } else {
      this.curTask = _.cloneDeep(taskInfo);
      this.curTask.index = index;
    }
  }

  // 点击按钮: 呼叫天使
  callAngel(id) {
    if (this.calling) {
      return;
    }
    this.api.get("assets/temp/callAngel.json", {
      id: id
    }).subscribe((res: any) => {
      if (res.success) {
        this.calling = true;
        this.callAngelTarget.play();
        setTimeout(() => {
          this.calling = false;
        }, this.duration);
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

  // 查询组员的信息
  searchMemberMsg(memberId) {
    let modalCtrlPW = this.modalCtrl.create(PasswordPage, { data: false }, { cssClass: "modal-pw" });
    modalCtrlPW.onDidDismiss((data) => {
      if (data) {
        this.api.get('assets/temp/msgList.json', {
          pw: data, id: memberId
        }).subscribe((res: any) => {
          if (res.success) {
            let modalCtrl = this.modalCtrl.create(MessagePage, { data: res.data }, { cssClass: "modal-memberMsg" });
            modalCtrl.present();
          } else {
            let alert = this.alertCtrl.create({
              title: '提示',
              message: res.info,
              buttons: ['确认']
            })
            alert.present();
          }
        })
      }
    })
    modalCtrlPW.present();
  }

  // 个人支付
  personalPay() {
    let modalCtrl = this.modalCtrl.create(PayPage, { isGroup: PWType.personal, groupId: this.groupId }, { cssClass: "modal-pay" });
    modalCtrl.present();
  }

  // 企业支付
  corporatePay() {
    let modalCtrl = this.modalCtrl.create(PayPage, { isGroup: PWType.group, groupId: this.groupId }, { cssClass: "modal-pay" });
    modalCtrl.present();
  }

  // 点赞
  like() {
    // 打开评论对话框
    let modalCtrlLike = this.modalCtrl.create(LikePage, {}, { cssClass: "modal-like" });
    modalCtrlLike.onDidDismiss((text) => {
      if (text !== undefined) {
        // 打开个人密码对话框
        let modalCtrl = this.modalCtrl.create(PasswordPage, { data: PWType.personal }, { cssClass: "modal-pw" });
        modalCtrl.onDidDismiss((pw) => {
          if (pw) {
            this.api.get('assets/temp/buyStock.json', {
              fromPW: pw,
              toID: this.groupId,
              decription: text
            }).subscribe((res: any) => {
              if (res.success) {
                this.tipsCtrl.create({ iconFontClass: 'icon-icon', message: "点赞成功" });
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
        });
        modalCtrl.present();
      }
    })
    modalCtrlLike.present();
  }

  // 打开拍照对话框
  takePic() {
    let modalCtrlPic = this.modalCtrl.create(PhotoPage, { memberList: this.groupInfo }, { cssClass: "modal-photo" });
    modalCtrlPic.present();
  }

  // 结婚
  addCouple(index) {
    let modalCtrl = this.modalCtrl.create(PasswordPage, { data: PWType.personal }, { cssClass: 'modal-pw' });
    modalCtrl.onDidDismiss((data) => {
      if (data) {
        this.couple[index] = data;
      }
    })
    modalCtrl.present();
  }

  marry() {
    if ((!this.couple[0] || this.couple[0].status < 0) || !this.couple[1]) {
      let alertCtrl = this.alertCtrl.create({
        title: '提示',
        message: '请找一位您心仪的对象共同完成这项任务。',
        buttons: ['确认']
      });
      alertCtrl.present();
      return;
    }


    let modalCtrl = this.modalCtrl.create(PasswordPage, { data: PWType.personal }, { cssClass: 'modal-pw' });
    modalCtrl.onDidDismiss((data) => {
      if (data) {
        this.api.get('assets/temp/sellStock.json', {
          witnessPW: data,
          couple: this.couple
        }).subscribe((res: any) => {
          if (res.success) {
            this.taskList[this.curTask.index].finished = this.curTask.finished = true;
            setTimeout(() => {
              this.taskList[this.curTask.index].finished = this.curTask.finished = false;
            }, 3000);
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


  // 打开输入密码的对话框
  openPWDialog(isGroup, funcType) {

  }

  // 做任务
  doTask(type: FuncType) {
    switch (type) {
      case FuncType.PersonalPay:
        this.personalPay();
        break;
      case FuncType.CorporatePay:
        this.corporatePay();
        break;
      case FuncType.Like:
        this.like();
        break;
      case FuncType.TakePic:
        this.takePic();
        break;
      default:
        break;
    }
  }
}
