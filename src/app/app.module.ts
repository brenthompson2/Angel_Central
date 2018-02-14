import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// My Imports
import { HttpModule } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';

// Pages
import { HomePage } from '../pages/home/home';
import { PicSelectPage } from '../pages/pic-select/pic-select';
import { TextSelectPage } from '../pages/text-select/text-select';
import { ReceiverSelectPage } from '../pages/receiver-select/receiver-select';
import { ConfirmPage } from '../pages/confirm/confirm';
import { FinalPage } from '../pages/final/final';

// Providers
import { PictureListProvider } from '../providers/picture-list/picture-list';
import { TextListProvider } from '../providers/text-list/text-list';
import { RecipientListProvider } from '../providers/recipient-list/recipient-list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PicSelectPage,
    TextSelectPage,
    ReceiverSelectPage,
    ConfirmPage,
    FinalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PicSelectPage,
    TextSelectPage,
    ReceiverSelectPage,
    ConfirmPage,
    FinalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocialSharing,
    PictureListProvider,
    TextListProvider,
    RecipientListProvider
  ]
})
export class AppModule {}
