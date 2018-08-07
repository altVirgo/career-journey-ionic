import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CareerPage } from '../career/career';
import { APIService } from '../../shared/services/api.service';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class VideoPage {
  private type;
  private groupId;
  private textAnimate = {
    text: [],
    timer: undefined,
    perTime: 100,
    curPoint: 0
  };
  private video = {
    target: undefined,
    canPlay: false,
    show: false,
    playFinish: false,
    videoOptions: {}
  };
  private isShowBtn = false;    // 是否显示重播跳过按钮

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: APIService
  ) {
    this.type = navParams.get('type');
    this.groupId = navParams.get("groupId");
  }


  ionViewDidEnter() {
    this.initData().subscribe((res: any) => {
      // 文字
      this.textAnimate.text = res.text.split('').map((ele, index) => {
        return {
          letter: ele,
          active: false
        }
      })
      this.startPlayText();

      // 视频
      setTimeout(() => {
        this.video.canPlay = true;
        console.log("readyState",this.video.target.readyState);
      }, this.textAnimate.perTime * this.textAnimate.text.length + 1000);
      this.video.target = document.getElementById('video-content');
      this.video.target.src = res.videoUrl;
      this.video.target.onended = () => {
        this.isShowBtn = true;
      }
    })
  }

  // 初始化数据
  initData() {
    return this.api.get("assets/temp/getVideoInfo.json", {
      careerType: this.type
    })
  }

  // 开始播放文字
  startPlayText() {
    this.textAnimate.timer = setInterval(() => {
      if (this.textAnimate.text[this.textAnimate.curPoint]) {
        this.textAnimate.text[this.textAnimate.curPoint].active = true;
        this.textAnimate.curPoint++;
      } else {
        clearInterval(this.textAnimate.timer);
      }
    }, this.textAnimate.perTime);
  }

  // 开始播放视频
  startPlayVideo() {
    this.video.show = true;
    this.video.target.play();
  }

  // 重播视频
  replayVideo() {
    this.video.target.load();
    this.video.target.play();
  }

  // 点击视频上的播放按钮
  playVideo(e) {
    e.stopPropagation();
    if (this.video.target.ended) {
      this.video.target.load();
      this.video.target.play();
    } else {
      this.video.target.play();
    }
  }

  // 点击视频暂停播放
  pauseVideo() {
    this.video.target.pause();
  }

  // 下一页
  nextPage() {
    this.navCtrl.setRoot(CareerPage, {
      type: this.type,
      groupId: this.groupId
    });
  }
}
