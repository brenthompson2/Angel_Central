/*
	File: picture-list.ts
	created: 02/08/18 by Brendan Thompson
	Updated: 02/08/18 by Brendan Thompson

	Summary: PictureListProvider gets the pictures
*/

// Imports
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';

@Injectable()
export class PictureListProvider {

	pictureList: any;

  	constructor() {
  		this.pictureList = [
  			{name: 'Image1', href: 'assets/imgs/test-images/5-entry-red.png', alt: 'alternative name'},
  			{name: 'Image2', href: 'assets/imgs/test-images/5-min-red.png', alt: 'alternative name'},
  			{name: 'Image3', href: 'assets/imgs/test-images/5-pitches-red.png', alt: 'alternative name'},
  			{name: 'Image4', href: 'assets/imgs/test-images/5-pm-red.png', alt: 'alternative name'},
  			{name: 'Image5', href: 'assets/imgs/test-images/500-red.png', alt: 'alternative name'}
  		];
  	}

  	loadAll(){
  		return Promise.resolve(this.pictureList);
  	}

  	getPicByName(nameToFind){
  		for (var i = 0; i < this.pictureList.length; i++) {
  			if (this.pictureList[i].name == nameToFind){
  				return Promise.resolve(this.pictureList[i]);
  			}
  		}
  	}
}
