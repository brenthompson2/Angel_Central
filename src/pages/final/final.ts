/*
  	File: final.ts
  	Updated: 02/08/18 by Brendan Thompson
    Updated: 05/08/18 by Brendan Thompson

  	Summary: Final page after sending Guardian Angel
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// My Imports
// import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { Platform } from 'ionic-angular';

// Pages

// Providers

@Component({
  	selector: 'page-final',
  	templateUrl: 'final.html',
})
export class FinalPage {

    // =========================================
    // Member Vars
    // =========================================
    private finalImage: any;

    // Admob
    private isTesting = true; // change to false in production
    private bannerAdUnitID: any;
    private interstitialAdUnitID: any;
    private bannerAdUnitID_Android = 'ca-app-pub-9786610691421616/5099124183'; // final-page-banner-android
    private bannerAdUnitID_iOS = 'ca-app-pub-9786610691421616/7994672844'; // final-page-banner-ios
    private interstitialAdUnitID_Android = 'ca-app-pub-9786610691421616/5234570140'; // sent-angel-interstitial-android
    private interstitialAdUnitID_iOS = 'ca-app-pub-9786610691421616/4334629431'; // sent-angel-interstitial-ios

    // =========================================
    // Constructor & Lifecycle events
    // =========================================

  	constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private platform: Platform,
                private admobFree: AdMobFree) {

  		this.finalImage = this.navParams.get('guardianAngel');
  	}

    ionViewDidEnter(){
        // Show Banner Ad
        this.platform.ready().then(() => {
            if(this.platform.is('mobile')){
                if (this.platform.is('Android')){
                    this.bannerAdUnitID = this.bannerAdUnitID_Android;
                    this.interstitialAdUnitID = this.interstitialAdUnitID_Android;
                }
                else {
                    this.bannerAdUnitID = this.bannerAdUnitID_iOS;
                    this.interstitialAdUnitID = this.interstitialAdUnitID_iOS;
                }
                this.showBannerAd();
                // this.launchInterstitialAd();
            }
            else {
                console.log("Ad unavailable: not recognized as mobile device");
            }
        });
    }

    ionViewWillLeave(){
        // Hide Banner Ad
        this.platform.ready().then(() => {
            if(this.platform.is('mobile')){
                this.admobFree.banner.hide();
            }
        });
    }

    // =========================================
    // Buttons
    // =========================================

  	returnHome(){
        this.navCtrl.popToRoot();
    }

    // To resend the angel just go back a page
    sendAgain(){
        this.navCtrl.pop();
    }

    // buyAlbum(){
        // const browser = this.IABrowser.create('itms-apps://itunes.apple.com/us/app/pages/id333903271?mt=8', '_system', 'location=yes');
    // }

    // =========================================
    // Advertisements
    // =========================================
    showBannerAd(){
        let bannerConfig: AdMobFreeBannerConfig = {
            isTesting: this.isTesting,
            autoShow: true,
            id: this.bannerAdUnitID // final-page-banner Ad Unit ID
            // id: 'ca-app-pub-3940256099942544/6300978111' // google test-banner Ad Unit ID
        };

        this.admobFree.banner.config(bannerConfig);

        this.admobFree.banner.prepare().then(() => {
            // success
        }).catch(e => console.log(e));
    }

    // Displays an interstitial (full page) Admob add
    launchInterstitialAd() {
        let interstitialConfig: AdMobFreeInterstitialConfig = {
            isTesting: this.isTesting,
            autoShow: true,
            id: this.interstitialAdUnitID // sent-angel-interstitial Ad Unit ID
            // id: 'ca-app-pub-3940256099942544/8691691433' // google test-interstitial Ad Unit ID
        };

        this.admobFree.interstitial.config(interstitialConfig);

        this.admobFree.interstitial.prepare()
        .then(() => {
            this.admobFree.interstitial.show();
        })
        .catch(e => console.log(e));
    }
}