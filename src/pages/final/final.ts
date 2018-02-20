/*
	File: final.ts
	Updated: 02/08/18 by Brendan Thompson
  Updated: 02/20/18 by Brendan Thompson

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

    // =========================================
    // Member Vars
    // =========================================
    private finalImage: any;

  	constructor(public navCtrl: NavController,
                public navParams: NavParams) {

  		  this.finalImage = this.navParams.get('guardianAngel');
  	}

  	returnHome(){
      this.navCtrl.popToRoot();
    }
}