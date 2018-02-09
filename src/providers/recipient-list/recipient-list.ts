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
export class RecipientListProvider {

	recipientList: any;

  	constructor() {
  		this.recipientList = [
  			{name: 'Brendan', email: 'brenthompson2@gmail.com'},
  			{name: 'Kyle', email: 'brenthompson2@gmail.com'},
  			{name: 'Brian', email: 'brenthompson2@gmail.com'},
  			{name: 'Emily', email: 'brenthompson2@gmail.com'},
  			{name: 'Keith', email: 'brenthompson2@gmail.com'},
  		];
  	}

  	loadAll(){
  		return Promise.resolve(this.recipientList);
  	}

  	getRecipientByName(nameToFind){
  		for (var i = 0; i < this.recipientList.length; i++) {
  			if (this.recipientList[i].id == nameToFind){
  				return Promise.resolve(this.recipientList[i]);
  			}
  		}
  	}

}
