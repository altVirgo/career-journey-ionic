import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({ name: 'countdown' })
@Injectable()
export class Countdown implements PipeTransform {
    transform(num: number) {
        let minutes = Math.floor(num / 60);
        let seconds = num % 60;

        return num <= 0 ? "0秒" : (minutes <= 0 ? '' : minutes + '分钟') + (seconds === 0 ? '' : seconds + '秒');
    }
}

