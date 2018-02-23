/*
	File: text-list.ts
	created: 02/08/18 by Brendan Thompson
	Updated: 02/22/18 by Brendan Thompson

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
  			{id: '0', category: 'guardian', text: 'May God Send His Angel To Watch Over You'},
  			{id: '1', category: 'warrior', text: 'May God Send His Warrior To Help You Fight'},
  			{id: '2', category: 'prayer', text: 'Sending You an Angel to Carry Your Prayers'}
  		];
  	}

    // Returns a list of all text in the selectedCategory
    loadSelected(selectedCategory){
        var listOfSelected: any = [];
        for (var i = 0; i < this.textList.length; i++) {
            // console.log("Comparing " + this.textList[i].category + " to " + selectedCategory)
            if (selectedCategory == this.textList[i].category){
                listOfSelected.push(this.textList[i]);
            }
        }
        return Promise.resolve(listOfSelected);
    }

    // Returns all text
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
