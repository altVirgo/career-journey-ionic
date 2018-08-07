import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { CommonTipsPage } from './tips.component';
import { TipsController } from './tips.controller';
@NgModule({
    declarations: [
        CommonTipsPage
    ],
    imports: [
        BrowserModule,
        CommonModule
    ],
    exports: [
        
    ],
    providers: [
        TipsController
    ],
    entryComponents: [
        CommonTipsPage
    ]
})
export class CommonTipsModule { }
