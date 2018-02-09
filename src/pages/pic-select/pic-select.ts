/*
  File: pic-select.ts
  Updated: 02/08/18 by Brendan Thompson
  Updated: 02/08/18 by Brendan Thompson

  Summary: Page for selecting the Image that will get sent
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// My Imports

// Pages
import { TextSelectPage } from '../text-select/text-select';

// Providers
import { PictureListProvider } from '../../providers/picture-list/picture-list';

@Component({
  	selector: 'page-pic-select',
  	templateUrl: 'pic-select.html',
})
export class PicSelectPage {

	  pictureList: any = 0;
	  currentPicture: any = 0;

  	constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private pictureListProviderObject : PictureListProvider) {

        // Load Pictures
  		  pictureListProviderObject.loadAll().then(result =>{
  			    this.pictureList = result;
            this.currentPicture = this.pictureList[0];
  		  });
  	}

    // Called when an image is selected from a thumbnail
  	selectPicture(selectedPicture){
  		  this.currentPicture = selectedPicture;
    	  // console.log('Selected a Picture: ' + JSON.stringify(this.currentPicture));
  	}

    // Called when submit button clicked
    submitSelection(){
        this.navCtrl.push(TextSelectPage, { selectedPicture: this.currentPicture });
    }
}
