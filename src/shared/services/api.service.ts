

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export enum ApiPreType {
    testUrlPre = '/proxy',
    appUrlPre = '',
    localUrlPre = ''

}


@Injectable()
export class APIService {
    private curPre = ApiPreType.localUrlPre;
    private localUrlPre = '';
    private appUrlPre = '';                // 生产环境(ip:port)
    private testUrlPre = '/proxy';         // 联调地址    配合ionic.config.json
    constructor(public http: HttpClient) {
    }

    post(url: string, body: any | null, options?) {
        return this.http.post(this.curPre + url, body, options);
    }
    
    get(url: string, options?) {
        return this.http.get(this.curPre + url, options);
    }



}
