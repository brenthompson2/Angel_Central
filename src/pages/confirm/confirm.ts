/*
  	File: confirm.ts
  	Updated: 02/08/18 by Brendan Thompson
    Updated: 06/14/18 by Brendan Thompson

  	Summary: Page for confirming and sending the Guardian Angel
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// My Imports
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { Platform } from 'ionic-angular';

// Pages
import { FinalPage } from '../final/final';

// Providers

@Component({
  	selector: 'page-confirm',
  	templateUrl: 'confirm.html',
})
export class ConfirmPage {

    // =========================================
    // Member Vars
    // =========================================
    private finalImage: any;

    // Admob
    private isTesting = true; // change to false in production
    private bannerAdUnitID: any;
    private interstitialAdUnitID: any;
    private bannerAdUnitID_Android = 'ca-app-pub-9786610691421616/5099124183'; // confirm-page-banner-android
    private bannerAdUnitID_iOS = 'ca-app-pub-9786610691421616/2824314631'; // confirm-page-banner-ios
    private interstitialAdUnitID_Android = 'ca-app-pub-9786610691421616/5234570140'; // sent-angel-interstitial-android
    private interstitialAdUnitID_iOS = 'ca-app-pub-9786610691421616/4334629431'; // sent-angel-interstitial-ios

    // =========================================
    // Constructor & Lifecycle events
    // =========================================

  	constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public sharing: SocialSharing,
                private platform: Platform,
                public admobFree: AdMobFree) {

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
    // Confirm Selection
    // =========================================

    // Function called by the Submit Button
    confirmSelection(){
        this.shareManually();

        // Show Interstitial Ad
        this.platform.ready().then(() => {
            if(this.platform.is('mobile')){
                this.launchInterstitialAd();
            }
            else {
                console.log("Ad unavailable: not recognized as mobile device");
            }
        });

        this.navCtrl.push(FinalPage, { guardianAngel: this.finalImage });
    }

    // =========================================
    // Functions for Sharing
    // =========================================

    // Brings up the default sharing menu for the device
    shareManually(){
        this.sharing.share("I am sending you this Guardian Angel ", "Guardian Angel", this.finalImage, null)
            .then(() => {
                console.log("Sent Guardian Angel");
            })
            .catch((error) =>{
                console.log(error);
            });
    }

    shareToFacebook(){
        this.sharing.shareViaFacebookWithPasteMessageHint("I am sending you this Guardian Angel ", this.finalImage, null)
            .then(() => {
                console.log("Sent Via Facebook");

            })
            .catch((error) =>{
                console.log(error);
            });
    }

    shareToInstagram(){
        this.sharing.shareViaInstagram("I am sending you this Guardian Angel ", this.finalImage)
            .then(() => {
                console.log("Sent Via Instagram");

            })
            .catch((error) =>{
                console.log(error);
            });
    }

    shareToTwitter(){
        this.sharing.shareViaTwitter("I am sending you this Guardian Angel ", this.finalImage, null)
            .then(() => {
                console.log("Sent Via Twitter");

            })
            .catch((error) =>{
                console.log(error);
            });
    }

    // shareToEmail(){
    //     this.sharing.shareViaEmail("I am sending you this Guardian Angel ", "Guardian Angel", "brenthompson2@gmail.com", null, null, null)
    //         .then(() => {
    //             console.log("Sent Via Email");

    //         })
    //         .catch((error) =>{
    //             console.log(error);
    //         });
    // }

    // =========================================
    // Advertisements
    // =========================================
    showBannerAd(){
        let bannerConfig: AdMobFreeBannerConfig = {
            isTesting: this.isTesting,
            autoShow: true,
            id: this.bannerAdUnitID // confirm-page-banner Ad Unit ID
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
            this.admobFree.interstitial.show()
        })
        .catch(e => console.log(e));
    }
}
