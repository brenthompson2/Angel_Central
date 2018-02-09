/*
	File: final.ts
	Updated: 02/08/18 by Brendan Thompson
	Updated: 02/08/18 by Brendan Thompson

	Summary: Final page after sending Guardian Angel
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// My Imports

// Pages

// Providers

@Component({
  	selector: 'page-final',
  	templateUrl: 'final.html',
})
export class FinalPage {

	selectedPicture: any = 0;
	selectedText: any = 0;
	selectedRecipient: any = 0;

  	constructor(public navCtrl: NavController, public navParams: NavParams) {

  		this.selectedPicture = this.navParams.get('selectedPicture');
  		this.selectedText = this.navParams.get('selectedText');
  		this.selectedRecipient = this.navParams.get('selectedRecipient');
  	}

  	returnHome(){
      this.navCtrl.popToRoot();
    }

}
