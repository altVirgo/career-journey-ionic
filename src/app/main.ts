import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log('FileTransfer');
}



platformBrowserDynamic().bootstrapModule(AppModule);

