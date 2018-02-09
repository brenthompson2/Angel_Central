/*
	File: receiver-select.ts
	Updated: 02/08/18 by Brendan Thompson
	Updated: 02/08/18 by Brendan Thompson

	Summary: Page for selecting the recipient of the Guardian Angel that will get sent
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// My Imports

// Pages
import { ConfirmPage } from '../confirm/confirm';

// Providers
import { RecipientListProvider } from '../../providers/recipient-list/recipient-list';

@Component({
  	selector: 'page-receiver-select',
  	templateUrl: 'receiver-select.html',
})
export class ReceiverSelectPage {

	selectedPicture: any = 0;
	selectedText: any = 0;
	recipientList: any = 0;
	currentRecipient: any = 0;

  	constructor(public navCtrl: NavController,
  				public navParams: NavParams,
  				private RecipientListProviderObject: RecipientListProvider) {

  		this.selectedPicture = this.navParams.get('selectedPicture');
  		this.selectedText = this.navParams.get('selectedText');

  		// Load Recipients
		RecipientListProviderObject.loadAll().then(result =>{
			this.recipientList = result;
        	this.currentRecipient = this.recipientList[0];
		});
  	}

    // Called when a recipient is selected from the list
  	selectRecipient(selectedRecipient){
  		  this.currentRecipient = selectedRecipient;
    	  // console.log('Selected a Text: ' + JSON.stringify(this.currentRecipient));
  	}

    // Called when submit button clicked
    submitSelection(){
        this.navCtrl.push(ConfirmPage, { selectedPicture: this.selectedPicture,
        									selectedText: this.selectedText,
        									selectedRecipient: this.currentRecipient });
    }

}
