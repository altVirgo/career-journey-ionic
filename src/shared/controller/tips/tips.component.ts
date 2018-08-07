import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Options } from './tips.controller';

@Component({
    selector: 'page-common-tips',
    templateUrl: 'tips.html'
})
export class CommonTipsPage {
    private options: Options;
    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController
    ) {
        this.options = this.viewCtrl.data.options;
    }

    ionViewDidEnter() {
    }

}
