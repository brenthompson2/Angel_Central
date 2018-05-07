/*
    File: pic-select.ts
    Created: 02/08/18 by Brendan Thompson
    Updated: 05/06/18 by Brendan Thompson

    Summary: Page for selecting the Image that will get sent
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// My Imports
import { ElementRef, ViewChild } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { Platform } from 'ionic-angular';

// Pages
import { TextSelectPage } from '../text-select/text-select';

// Providers
import { PictureListProvider } from '../../providers/picture-list/picture-list';

@Component({
  	selector: 'page-pic-select',
  	templateUrl: 'pic-select.html',
})
export class PicSelectPage {

    // =========================================
    // Member Vars
    // =========================================

    // Canvas Angel Design Constants
    private canvasColor = "rgba(255, 255, 255, 1)";
    private pictureWidth = 760;
    private pictureHeight = 1400;

    // Data
    selectedCategory: any = 0;
    currentPicture: any = 0;
    pictureList: any = 0;

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
                private pictureListProviderObject : PictureListProvider,
                private platform: Platform,
                private admobFree: AdMobFree) {

        this.selectedCategory = navParams.get('selectedCategory');

        // Load Pictures
  		pictureListProviderObject.loadSelected(this.selectedCategory).then(result =>{
  			    this.pictureList = result;
            this.currentPicture = this.pictureList[0];
  		});
  	}

    ionViewDidLoad(){
        this.initialiseCanvas();
    }

    ionViewDidEnter(){
        // Show Banner Ad
        this.platform.ready().then(() => {
            if(this.platform.is('mobile')){
                console.log("Platform is mobile");
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
    // Picture Selection
    // =========================================

    // Called when an image is selected from a thumbnail
  	selectPicture(selectedPicture){
  		this.currentPicture = selectedPicture;
        this.theContext.clearRect(0, 0, this.theCanvas.width, this.theCanvas.height);
        this.drawTheImage();
    	  // console.log('Selected a Picture: ' + JSON.stringify(this.currentPicture));
  	}

    getSelectStatus(selectedPicture){
        if (selectedPicture == this.currentPicture){
            return true;
        }
        else {
            return false;
        }
    }

    // Called when submit button clicked
    submitSelection(){
        this.navCtrl.push(TextSelectPage, { selectedPicture: this.currentPicture,
                                            selectedCategory: this.selectedCategory });
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
        // Fill background
        this.theContext.fillStyle = this.canvasColor;
        this.theContext.fillRect(0, 0, this.theCanvas.width, this.theCanvas.height);

        // Display the Image
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = (event) => {
            this.theContext.drawImage(img, this.theCanvas.width/2 - img.width/2, this.theCanvas.height/2 - img.height/2);
            this.finalImage = this.theCanvas.toDataURL();
        };
        img.src=this.currentPicture;
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
