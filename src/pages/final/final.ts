/*
  	File: final.ts
  	Updated: 02/08/18 by Brendan Thompson
    Updated: 05/06/18 by Brendan Thompson

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
                this.showBannerAd();
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
            isTesting: true, // Remove in production
            autoShow: true
            // id: 'ca-app-pub-9786610691421616/5622014155'
        };

        this.admobFree.banner.config(bannerConfig);

        this.admobFree.banner.prepare().then(() => {
            // success
        }).catch(e => console.log(e));
    }

    // Displays an interstitial (full page) Admob add
    launchInterstitialAd() {
        let interstitialConfig: AdMobFreeInterstitialConfig = {
            // id: 'ca-app-pub-9786610691421616/5622014155',
            isTesting: true,
            autoShow: true
        };

        this.admobFree.interstitial.config(interstitialConfig);

        this.admobFree.interstitial.prepare()
        .then(() => {
            this.admobFree.interstitial.show()
        })
        .catch(e => console.log(e));
    }
}