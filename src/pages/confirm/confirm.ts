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
import { ElementRef, ViewChild } from '@angular/core';

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

    // Managing Data
  	private selectedPicture: any = 0;
  	private selectedText: any = 0;
  	private selectedRecipient: any = 0;
    private mySharing: any; // Social Sharing Object

    // Canvas
    @ViewChild('myCanvas') canvasEl: ElementRef;
    private theCanvas: any;
    private theContext: any;
    private finalImage: any;

    // =========================================
    // Constructor
    // =========================================

  	constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public sharing: SocialSharing,
                private elementReference: ElementRef) {

		this.selectedPicture = this.navParams.get('selectedPicture');
		this.selectedText = this.navParams.get('selectedText');
		this.selectedRecipient = "Brendan"; // this.navParams.get('selectedRecipient');

        this.mySharing = sharing;
  	}

    ionViewDidLoad(){
        this.initialiseCanvas();
    }

    // Function called by the Submit Button
    confirmSelection(){
        this.shareManually();

        this.navCtrl.push(FinalPage, { selectedPicture: this.selectedPicture,
                                        selectedText: this.selectedText,
                                        selectedRecipient: this.selectedRecipient });
    }

    // =========================================
    // Functions for Drawing Canvas
    // =========================================
    initialiseCanvas(){
        this.theCanvas = this.canvasEl.nativeElement;
        this.theCanvas.width = window.innerWidth;
        this.theCanvas.height = window.innerHeight;
        if(this.theCanvas.getContext){
            this.theContext = this.theCanvas.getContext('2d');
            this.drawTheImage();
        }
    }

    drawTheImage(){
        // Display the Image
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = (event) => {
            this.theContext.drawImage(img, this.theCanvas.width/2 - img.width/2, this.theCanvas.height/2 - img.height/2);
            this.drawText();
        };
        img.src=this.selectedPicture.href;
    }

    drawText(){
        this.theContext.strokeStyle = "rgba(256, 0, 0, 1.0)";
        this.theContext.font = "50px Arial";
        this.theContext.textAlign = "center";
        this.theContext.strokeText(this.selectedText.text, this.theCanvas.width/2, this.theCanvas.height/2);
        this.saveCanvas();
    }

    saveCanvas(){
        this.finalImage = this.theCanvas.toDataURL();
    }

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
