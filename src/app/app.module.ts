import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// My Imports
import { HttpModule } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobFree } from '@ionic-native/admob-free';
import { NativeAudio } from '@ionic-native/native-audio';

// Pages
import { HomePage } from '../pages/home/home';
import { CategorySelectPage } from '../pages/category-select/category-select';
import { PicSelectPage } from '../pages/pic-select/pic-select';
import { TextSelectPage } from '../pages/text-select/text-select';
import { ConfirmPage } from '../pages/confirm/confirm';
import { FinalPage } from '../pages/final/final';

// Providers
import { PictureListProvider } from '../providers/picture-list/picture-list';
import { TextListProvider } from '../providers/text-list/text-list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategorySelectPage,
    PicSelectPage,
    TextSelectPage,
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
    CategorySelectPage,
    PicSelectPage,
    TextSelectPage,
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
    AdMobFree,
    NativeAudio
  ]
})
export class AppModule {}
