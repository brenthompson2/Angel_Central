/*
	File: text-list.ts
	created: 02/08/18 by Brendan Thompson
	Updated: 02/08/18 by Brendan Thompson

	Summary: TextListProvider gets the text
*/

// Imports
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';

@Injectable()
export class TextListProvider {

	textList: any;

  	constructor() {
  		this.textList = [
  			{id: '0', text: 'Example Text 0'},
  			{id: '1', text: 'Example Text 1'},
  			{id: '2', text: 'Example Text 2'},
  			{id: '3', text: 'Example Text 3'},
  			{id: '4', text: 'Example Text 4'},
  		];
  	}

  	loadAll(){
  		return Promise.resolve(this.textList);
  	}

  	getTextById(idToFind){
  		for (var i = 0; i < this.textList.length; i++) {
  			if (this.textList[i].id == idToFind){
  				return Promise.resolve(this.textList[i]);
  			}
  		}
  	}
}
