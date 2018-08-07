

import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { CommonTipsPage } from './tips.component';


import * as _ from 'lodash';

export interface Options {
    iconFontClass?: String,
    message: String,
    duration?: Number
}

@Injectable()
export class TipsController {
    constructor(public modalCtrl: ModalController) {
    }

    create(options: Options) {
        options = _.extend({
            iconFontClass: '',
            message: '',
            duration: 1000
        }, options);
        let tipCtrl = this.modalCtrl.create(CommonTipsPage, { options: options }, { cssClass: 'common-tips', enableBackdropDismiss: false });
        tipCtrl.present();
        setTimeout(() => {
            tipCtrl.dismiss();
        }, options.duration)
    }

}
