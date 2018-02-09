/*
	File: confirm.ts
	Updated: 02/08/18 by Brendan Thompson
	Updated: 02/08/18 by Brendan Thompson

	Summary: Page for confirming and sending the Guardian Angel
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// My Imports

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

  	constructor(public navCtrl: NavController, public navParams: NavParams) {

  		this.selectedPicture = this.navParams.get('selectedPicture');
  		this.selectedText = this.navParams.get('selectedText');
  		this.selectedRecipient = this.navParams.get('selectedRecipient');
  	}

  	confirmSelection(){
        this.navCtrl.push(FinalPage, { selectedPicture: this.selectedPicture,
        								selectedText: this.selectedText,
        								selectedRecipient: this.selectedRecipient });
  	}

}
