/*
  	File: confirm.ts
  	Updated: 02/08/18 by Brendan Thompson
    Updated: 02/13/18 by Brendan Thompson

  	Summary: Page for confirming and sending the Guardian Angel
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// My Imports
import { SocialSharing } from '@ionic-native/social-sharing';

// Pages
import { FinalPage } from '../final/final';

// Providers

@Component({
  	selector: 'page-confirm',
  	templateUrl: 'confirm.html',
})
export class ConfirmPage {

  	selectedPicture: any = 0;
  	selectedText: any = 0;
  	selectedRecipient: any = 0;
    mySharing: any; // Social Sharing Object

  	constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public sharing: SocialSharing) {

    		this.selectedPicture = this.navParams.get('selectedPicture');
    		this.selectedText = this.navParams.get('selectedText');
    		this.selectedRecipient = "Brendan"; // this.navParams.get('selectedRecipient');

        this.mySharing = sharing;
  	}

  	confirmSelection(){
        this.shareManually();

        this.navCtrl.push(FinalPage, { selectedPicture: this.selectedPicture,
        								selectedText: this.selectedText,
        								selectedRecipient: this.selectedRecipient });
  	}

    // Brings up the default sharing menu for the device
    shareManually(){
        this.mySharing.share("I am sending you this Guardian Angel ", "Guardian Angel", this.selectedPicture.href, "brendev.co")
            .then(() => {
                console.log("Sent Guardian Angel");
            })
            .catch((error) =>{
                console.log(error);
            });
    }

    shareToFacebook(){
        this.mySharing.shareViaFacebookWithPasteMessageHint("I am sending you this Guardian Angel ", this.selectedPicture.href, null)
            .then(() => {
                console.log("Sent Via Facebook");

            })
            .catch((error) =>{
                console.log(error);
            });
    }

    shareToInstagram(){
        this.mySharing.shareViaInstagram("I am sending you this Guardian Angel ", this.selectedPicture.href)
            .then(() => {
                console.log("Sent Via Instagram");

            })
            .catch((error) =>{
                console.log(error);
            });
    }

    shareToTwitter(){
        this.mySharing.shareViaTwitter("I am sending you this Guardian Angel ", this.selectedPicture.href, null)
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
