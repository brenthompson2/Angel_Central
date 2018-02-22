/*
  	File: pic-select.ts
  	Created: 02/21/18 by Brendan Thompson
  	Updated: 02/21/18 by Brendan Thompson

  	Summary: Page for selecting the Image that will get sent
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Pages
import { PicSelectPage } from '../pic-select/pic-select';

@Component({
  	selector: 'page-category-select',
  	templateUrl: 'category-select.html',
})
export class CategorySelectPage {

	constructor(public navCtrl: NavController,
				public navParams: NavParams) {
	}

	ionViewDidLoad() {
	    console.log('ionViewDidLoad CategorySelectPage');
	}

  	selectedCategory(theCategory){
  		this.navCtrl.push(PicSelectPage, { selectedCategory: theCategory });
  	}

}
