/*
	  File: text-select.ts
	  Updated: 02/08/18 by Brendan Thompson
	  Updated: 02/20/18 by Brendan Thompson

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

    // Data
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

      	// Load Texts
    		TextListProviderObject.loadAll().then(result =>{
    			this.textList = result;
            	this.currentText = this.textList[0];
    		});
  	}

    ionViewDidLoad(){
        this.initialiseCanvas();
    }

    // Called when a text is selected from the list
  	selectText(selectedText){
  		  this.currentText = selectedText;
        this.theContext.clearRect(0, 0, this.theCanvas.width, this.theCanvas.height);
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
        img.src=this.selectedPicture;
    }

    drawText(){
        this.theContext.strokeStyle = "rgba(256, 0, 0, 1.0)";
        this.theContext.font = "50px Arial";
        this.theContext.textAlign = "center";
        this.theContext.strokeText(this.currentText.text, this.theCanvas.width/2, this.theCanvas.height/2);
        this.saveCanvas();
    }

    saveCanvas(){
        this.finalImage = this.theCanvas.toDataURL();
    }

}
