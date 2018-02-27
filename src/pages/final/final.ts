/*
  	File: final.ts
  	Updated: 02/08/18 by Brendan Thompson
    Updated: 02/22/18 by Brendan Thompson

  	Summary: Final page after sending Guardian Angel
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// My Imports
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
                public navParams: NavParams,
                private IABrowser: InAppBrowser) {

  		  this.finalImage = this.navParams.get('guardianAngel');
  	}

  	returnHome(){
        this.navCtrl.popToRoot();
    }

    buyAlbum(){
        // const browser = this.IABrowser.create('itms-apps://itunes.apple.com/us/app/pages/id333903271?mt=8', '_system', 'location=yes');
    }
}