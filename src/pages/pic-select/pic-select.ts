/*
  File: pic-select.ts
  Updated: 02/08/18 by Brendan Thompson
  Updated: 02/20/18 by Brendan Thompson

  Summary: Page for selecting the Image that will get sent
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// My Imports
import { ElementRef, ViewChild } from '@angular/core';

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

    // Canvas Style Constants
    private pictureWidth: any = 900;
    private pictureHeight: any = 1600;

    // Data
	  currentPicture: any = 0;
    pictureList: any = 0;

    // Canvas
    @ViewChild('myCanvas') canvasEl: ElementRef;
    private theCanvas: any;
    private theContext: any;
    private finalImage: any;

  	constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private pictureListProviderObject : PictureListProvider,
                private elementReference: ElementRef) {

        // Load Pictures
  		  pictureListProviderObject.loadAll().then(result =>{
  			    this.pictureList = result;
            this.currentPicture = this.pictureList[0];
  		  });
  	}

    ionViewDidLoad(){
        this.initialiseCanvas();
    }

    // Called when an image is selected from a thumbnail
  	selectPicture(selectedPicture){
  		  this.currentPicture = selectedPicture;
        this.theContext.clearRect(0, 0, this.theCanvas.width, this.theCanvas.height);
        this.drawTheImage();
    	  // console.log('Selected a Picture: ' + JSON.stringify(this.currentPicture));
  	}

    // Called when submit button clicked
    submitSelection(){
        this.navCtrl.push(TextSelectPage, { selectedPicture: this.currentPicture.href });
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
        this.theContext.fillStyle = 'rgba(200, 200, 200, 0.5)';
        this.theContext.fillRect(0, 0, this.theCanvas.width, this.theCanvas.height);

        // Display the Image
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = (event) => {
            this.theContext.drawImage(img, this.theCanvas.width/2 - img.width/2, this.theCanvas.height/2 - img.height/2);
            this.finalImage = this.theCanvas.toDataURL();
        };
        img.src=this.currentPicture.href;
    }
}
