import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { VideoPage } from '../pages/video/video';
import { CareerPage } from '../pages/career/career';
import { PasswordPage } from '../pages/dialog/password/password';
import { MessagePage } from '../pages/dialog/message/message';
import { PayPage } from '../pages/dialog/pay/pay';
import { LikePage } from '../pages/dialog/like/like';
import { SignPage } from '../pages/sign/sign';
import { BuyPage } from '../pages/dialog/buy/buy';
import { SellPage } from '../pages/dialog/sell/sell';
import { PipesModule } from '../shared/pipe/pipe.moudule';
import { CommonTipsModule } from '../shared/controller/tips/tips.moudule';
import { QuestionsPage } from '../pages/career/questions/questions';
import { StockPage } from '../pages/career/stock/stock';
import { PhotoPage } from '../pages/dialog/photo/photo';
import { ShowPhotoPage } from '../pages/dialog/showPhoto/showPhoto';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { UploadPhotoPage } from '../pages/dialog/uploadPhoto/uploadPhoto';
import { APIService } from '../shared/services/api.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    VideoPage,
    SignPage,
    CareerPage,
    PasswordPage,
    MessagePage,
    PayPage,
    LikePage,
    BuyPage,
    SellPage,
    PhotoPage,
    ShowPhotoPage,
    UploadPhotoPage,
    QuestionsPage,
    StockPage
  ],
  imports: [
  BrowserModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    PipesModule,
    CommonTipsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    VideoPage,
    SignPage,
    CareerPage,
    PasswordPage,
    MessagePage,
    PayPage,
    LikePage,
    BuyPage,
    SellPage,
    PhotoPage,
    ShowPhotoPage,
    UploadPhotoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ScreenOrientation,
    File,
    FileTransfer,
    APIService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
