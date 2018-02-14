/*
	  File: text-select.ts
	  Updated: 02/08/18 by Brendan Thompson
	  Updated: 02/13/18 by Brendan Thompson

	  Summary: Page for selecting the text that will go with the image that will get sent
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// My Imports

// Pages
// import { ReceiverSelectPage } from '../receiver-select/receiver-select';
import { ConfirmPage } from '../confirm/confirm';

// Providers
import { TextListProvider } from '../../providers/text-list/text-list';

@Component({
  	selector: 'page-text-select',
  	templateUrl: 'text-select.html',
})
export class TextSelectPage {

  	selectedPicture: any = 0;
  	textList: any = 0;
  	currentText: any = 0;

  	constructor(public navCtrl: NavController,
  				      public navParams: NavParams,
  				      private TextListProviderObject: TextListProvider) {

  		  this.selectedPicture = this.navParams.get('selectedPicture');

      	// Load Texts
    		TextListProviderObject.loadAll().then(result =>{
    			this.textList = result;
            	this.currentText = this.textList[0];
    		});
  	}

    // Called when a text is selected from the list
  	selectText(selectedText){
  		  this.currentText = selectedText;
    	  // console.log('Selected a Text: ' + JSON.stringify(this.currentText));
  	}

    // Called when submit button clicked
    submitSelection(){
        this.navCtrl.push(ConfirmPage, { selectedPicture: this.selectedPicture,
        									selectedText: this.currentText });
    }

}
