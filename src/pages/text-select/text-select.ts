/*
	File: text-select.ts
	Created: 02/08/18 by Brendan Thompson
	Updated: 02/26/18 by Brendan Thompson

	Summary: Page for selecting the text that will go with the image that will get sent
    - Also writes the canvas out as an image
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// My Imports
import { ElementRef, ViewChild } from '@angular/core';

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
    // Member Vars
    // =========================================

    // Canvas Style Constants
    private pictureWidth: any = 900;
    private pictureHeight: any = 1600;
    private fontStyle: any = "50px Arial";
    private fontColor: any = "rgba(0, 0, 255, 1)"

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

  	constructor(public navCtrl: NavController,
  				public navParams: NavParams,
  				private TextListProviderObject: TextListProvider,
                private elementReference: ElementRef) {

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

    // Called when a text is selected from the list
  	selectText(selectedText){
  		this.currentText =  Object.assign({}, selectedText);
        this.drawTheImage();
    	// console.log('Selected a Text: ' + JSON.stringify(this.currentText));
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
        this.theContext.fillStyle = 'rgba(200, 200, 200, 0.5)';
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
        this.theContext.font = this.fontStyle;
        this.theContext.fillStyle = this.fontColor;
        this.theContext.strokeStyle = this.fontColor;
        this.theContext.textAlign = "center";
        this.theContext.fillText(this.currentText.text, this.theCanvas.width/2, this.theCanvas.height/2);
        this.theContext.strokeText(this.currentText.text, this.theCanvas.width/2, this.theCanvas.height/2);
        this.saveCanvas();
    }

    saveCanvas(){
        this.finalImage = this.theCanvas.toDataURL();
    }

}
