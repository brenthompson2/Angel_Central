/*
  	File: final.ts
  	Updated: 02/08/18 by Brendan Thompson
    Updated: 03/02/18 by Brendan Thompson

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
    private myAdmob: any;

  	constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private platform: Platform,
                private admob: AdMobFree) {

  		this.finalImage = this.navParams.get('guardianAngel');
        this.myAdmob = admob;

        platform.ready().then(() => {
            if(this.platform.is('mobile')){
                this.launchInterstitial();
            }
        });
  	}

  	returnHome(){
        this.navCtrl.popToRoot();
    }

    buyAlbum(){
        // const browser = this.IABrowser.create('itms-apps://itunes.apple.com/us/app/pages/id333903271?mt=8', '_system', 'location=yes');
    }

    // Displays an interstitial (full page) Admob add
    launchInterstitial() {
        let interstitialConfig: AdMobFreeInterstitialConfig = {
            // id: 'ca-app-pub-9786610691421616/5622014155',
            isTesting: true,
            autoShow: true
        };

        this.myAdmob.interstitial.config(interstitialConfig);

        this.myAdmob.interstitial.prepare()
        .then(() => {
            this.myAdmob.interstitial.show()
        })
        .catch(e => console.log(e));
    }

    showBannerAd(){
        let bannerConfig: AdMobFreeBannerConfig = {
            isTesting: true, // Remove in production
            autoShow: true
            // id: 'ca-app-pub-9786610691421616/5622014155'
        };

        this.admob.banner.config(bannerConfig);

        this.admob.banner.prepare().then(() => {
            // success
        }).catch(e => console.log(e));
    }
}