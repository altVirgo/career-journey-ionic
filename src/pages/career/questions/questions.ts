import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';
import { APIService } from '../../../shared/services/api.service';

export enum StatusType {
  Before = -1,
  Ing,
  After
}

@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html'
})
export class QuestionsPage implements OnInit {
  @Input() data;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();
  @Input() remainTime;
  @Output() remainTimeChange: EventEmitter<any> = new EventEmitter();
  @Input() status;
  @Output() statusChange: EventEmitter<any> = new EventEmitter();
  private pw: string = '';
  private remainTimer: any;
  private canSubmit: Boolean = false;
  private scores: Number = 98;
  constructor(
    public viewCtrl: ViewController,
    public api: APIService,
    public alertCtrl: AlertController
  ) {

  }

  ngOnInit() {
    if (this.status === StatusType.Ing) {
      this.startTime();
    }
    if (this.status === StatusType.After) {
      this.remainTime = 10 * 60;
      this.status = StatusType.Before;
    }
  }

  // 开始答题
  start() {
    this.initData();
  }

  initData() {
    this.api.get("assets/temp/examInfo.json", {
      pw: this.pw
    }).subscribe((res: any) => {
      if (res.success) {
        this.data.examList = res.data;
        this.status = StatusType.Ing;
        this.startTime();
        this.emitData();
      } else {
        let alertCtrl = this.alertCtrl.create({
          title: '提示',
          message: res.info,
          buttons: ['确认']
        });
        alertCtrl.present();
      }
    })
  }

  // 开始计时
  startTime() {
    this.remainTimer = setInterval(() => {
      if (this.remainTime >= 1) {
        this.remainTime--;
      } else {
        this.submit();
      }
      this.remainTimeChange.emit(this.remainTime);
      this.statusChange.emit(this.status);
    }, 1000);
  }

  // 检查是否可以提交
  checkCanSubmit() {
    let flag = true;
    this.data.examList.map((ele) => {
      if (!ele.cur) {
        flag = false;
      }
    })
    this.canSubmit = flag;
    this.emitData();
  }

  // 提交答案
  submit() {
    if (this.remainTimer) {
      clearInterval(this.remainTimer);
    }
    let qa = this.data.examList.map((ele, idx) => {
      return { id: ele.id, answer: ele.cur }
    })
    this.api.get("assets/temp/sellStock.json", {
      pw: this.pw,
      data: qa
    }).subscribe((res: any) => {
      if (res.success) {
        this.status = StatusType.After;
        this.data.finished = true;
        this.emitData();
        setTimeout(() => {
          this.data.finished = false;
          this.remainTime = 10 * 60;
          this.status = StatusType.Before;
          this.pw = '';
          this.emitData();
        }, 3000)
      }
    })
  }

  emitData() {
    this.dataChange.emit(this.data);
    this.remainTimeChange.emit(this.remainTime);
    this.statusChange.emit(this.status);
  };
}
