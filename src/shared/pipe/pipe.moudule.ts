import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Countdown } from './app.pipe';
@NgModule({
    declarations: [
        Countdown
    ],
    imports: [
        CommonModule
    ],
    exports: [
        Countdown
    ]
})
export class PipesModule { }
