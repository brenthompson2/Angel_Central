/*
  	File: confirm.ts
  	Updated: 02/08/18 by Brendan Thompson
    Updated: 02/20/18 by Brendan Thompson

  	Summary: Page for confirming and sending the Guardian Angel
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// My Imports
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

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
    private mySharing: any;
    private finalImage: any;

    // =========================================
    // Constructor
    // =========================================

  	constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public sharing: SocialSharing,
                public admob: AdMobFree) {

		this.finalImage = this.navParams.get('guardianAngel');
        this.mySharing = sharing;
  	}

    // Function called by the Submit Button
    confirmSelection(){
        this.shareManually();
        this.navCtrl.push(FinalPage, { guardianAngel: this.finalImage });
    }

    // Displays an interstitial (full page) Admob add
    // launchInterstitial() {
    //     let interstitialConfig: AdMobFreeInterstitialConfig = {
    //         isTesting: true, // Remove in production
    //         autoShow: true
    //         //id: Your Ad Unit ID goes here
    //     };

    //     this.admob.interstitial.config(interstitialConfig);

    //     this.admob.interstitial.prepare().then(() => {
    //         // success
    //     });
    // }

    // =========================================
    // Functions for Sharing
    // =========================================

    // Brings up the default sharing menu for the device
    shareManually(){
        this.mySharing.share("I am sending you this Guardian Angel ", "Guardian Angel", this.finalImage, null)
            .then(() => {
                console.log("Sent Guardian Angel");
            })
            .catch((error) =>{
                console.log(error);
            });
    }

    shareToFacebook(){
        this.mySharing.shareViaFacebookWithPasteMessageHint("I am sending you this Guardian Angel ", this.finalImage, null)
            .then(() => {
                console.log("Sent Via Facebook");

            })
            .catch((error) =>{
                console.log(error);
            });
    }

    shareToInstagram(){
        this.mySharing.shareViaInstagram("I am sending you this Guardian Angel ", this.finalImage)
            .then(() => {
                console.log("Sent Via Instagram");

            })
            .catch((error) =>{
                console.log(error);
            });
    }

    shareToTwitter(){
        this.mySharing.shareViaTwitter("I am sending you this Guardian Angel ", this.finalImage, null)
            .then(() => {
                console.log("Sent Via Twitter");

            })
            .catch((error) =>{
                console.log(error);
            });
    }

    shareToEmail(){
        this.mySharing.shareViaEmail("I am sending you this Guardian Angel ", "Guardian Angel", "brenthompson2@gmail.com", null, null, null)
            .then(() => {
                console.log("Sent Via Email");

            })
            .catch((error) =>{
                console.log(error);
            });
    }

}
