/*
	File: text-select.ts
	Created: 02/08/18 by Brendan Thompson
    Updated: 05/06/18 by Brendan Thompson

	Summary: Page for selecting the text that will go with the image that will get sent
    - Also writes the canvas out as an image
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// My Imports
import { ElementRef, ViewChild } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { Platform } from 'ionic-angular';

// Pages
import { ConfirmPage } from '../confirm/confirm';

// Providers
import { TextListProvider } from '../../providers/text-list/text-list';

@Component({
  	selector: 'page-text-select',
  	templateUrl: 'text-select.html',
})
export class TextSelectPage {

    // =========================================
    // Canvas Angel Design Constants
    // =========================================

    // Canvas
    private canvasColor = "rgba(255, 255, 255, 1)";
    private pictureWidth = 760;
    private pictureHeight = 1400;

    // Text
    private textX = this.pictureWidth/2;
    private textY = this.pictureHeight - (this.pictureHeight/4);
    private textWrapWidth = this.pictureWidth - (this.pictureWidth/9.00);
    private textWrapHeight = 120;
    private fontStyle = "italic 70px Arial";
    private fontColor = "rgba(255, 255, 255, 1)"; // For fillText
    private borderWidth = 2.2;
    private borderColor = "rgba(0, 0, 0, 1)"; // For strokeText border

    // =========================================
    // Member Vars
    // =========================================

    // Data
    private selectedCategory: any = 0;
  	private selectedPicture: any = 0;
  	private currentText: any = 0;
    private textList: any = 0;

    // Canvas
    @ViewChild('myCanvas') canvasEl: ElementRef;
    private theCanvas: any;
    private theContext: any;
    private finalImage: any;

    // =========================================
    // Constructor & Lifecycle events
    // =========================================

  	constructor(public navCtrl: NavController,
  				public navParams: NavParams,
  				private TextListProviderObject: TextListProvider,
                private platform: Platform,
                private admobFree: AdMobFree) {

  		this.selectedPicture = this.navParams.get('selectedPicture');
        this.selectedCategory = this.navParams.get('selectedCategory');

      	// Load Texts
    	TextListProviderObject.loadSelected(this.selectedCategory).then(result =>{
    		this.textList = result;
           	this.currentText = Object.assign({}, this.textList[0]);
    	});
  	}

    ionViewDidLoad(){
        this.initialiseCanvas();
    }

    ionViewDidEnter(){
        // Show Banner Ad
        this.platform.ready().then(() => {
            if(this.platform.is('mobile')){
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
    // Text Selection
    // =========================================

    // Called when a text is selected from the list
  	selectText(selectedText){
  		this.currentText =  Object.assign({}, selectedText);
        this.drawTheImage();
    	// console.log('Selected a Text: ' + JSON.stringify(this.currentText));
  	}

    // Called by a button to reset the text if edited
    resetText(){
        this.currentText = Object.assign({}, this.textList[0]);
        this.drawTheImage();
    }

    // Called when submit button clicked
    submitSelection(){
        this.navCtrl.push(ConfirmPage, { guardianAngel: this.finalImage });
    }

    // =========================================
    // Functions for Drawing Canvas
    // =========================================
    initialiseCanvas(){
        this.theCanvas = this.canvasEl.nativeElement;
        this.theCanvas.width = this.pictureWidth;
        this.theCanvas.height = this.pictureHeight;
        if(this.theCanvas.getContext){
            this.theContext = this.theCanvas.getContext('2d');
            this.drawTheImage();
        }
    }

    drawTheImage(){
        // Clear Current Image
        this.theContext.clearRect(0, 0, this.theCanvas.width, this.theCanvas.height);

        // Fill background
        this.theContext.fillStyle = this.canvasColor;
        this.theContext.fillRect(0, 0, this.theCanvas.width, this.theCanvas.height);

        // Display the Image
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = (event) => {
            this.theContext.drawImage(img, this.theCanvas.width/2 - img.width/2, this.theCanvas.height/2 - img.height/2);
            this.drawText();
        };
        img.src=this.selectedPicture;
    }

    drawText(){
        // Configure Text
        this.theContext.font = this.fontStyle;
        this.theContext.textAlign = "center";
        this.theContext.fillStyle = this.fontColor; // fill text
        this.theContext.lineWidth = this.borderWidth;
        this.theContext.strokeStyle = this.borderColor; // stroke border

        // Draw Text
        // this.theContext.fillText(this.currentText.text, this.theCanvas.width/2, this.theCanvas.height/2);
        // this.theContext.strokeText(this.currentText.text, this.theCanvas.width/2, this.theCanvas.height/2);
        this.wrapText();

        this.saveCanvas();
    }

    // Text wrapping function from https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
    wrapText() {
        var allWordsList = this.currentText.text.split(' ');
        var allLinesList: any = [];

        // Create allLinesList
        var currentLine = '';
        for(var n = 0; n < allWordsList.length; n++) {
            var testLine = currentLine + allWordsList[n] + ' '; // create a testLine that adds the next word onto currentLine
            var metrics = this.theContext.measureText(testLine); // calculate the width given the testLine
            var testWidth = metrics.width;

            // Check if line fits
            if (testWidth > this.textWrapWidth) { // If the word makes it to big, add the currentLine
                allLinesList.push(currentLine);
                console.log(allLinesList);
                currentLine = allWordsList[n] + ' ';
            }
            else {
                currentLine = testLine; // else, the testLine is still small enough and can be used as the currentLine
            }
        }
        allLinesList.push(currentLine); // add final words
        console.log(allLinesList);

        // Calculate needed height for allLinesList
        var currentTextY = this.theCanvas.height - (this.textWrapHeight * allLinesList.length);
        console.log("Starting text at Y = " + currentTextY);

        // Draw allLinesList
        for (var i = 0; i < allLinesList.length; i++){
            this.theContext.fillText(allLinesList[i], this.textX, currentTextY); // fill text
            this.theContext.strokeText(allLinesList[i], this.textX, currentTextY); // stroke border
            console.log("Writing Line ->" + allLinesList[i] + "<-");
            currentTextY += this.textWrapHeight;
        }
    }

    saveCanvas(){
        this.finalImage = this.theCanvas.toDataURL();
    }

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
}