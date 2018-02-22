/*
	File: picture-list.ts
	created: 02/08/18 by Brendan Thompson
	Updated: 02/21/18 by Brendan Thompson

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
      			{category: 'guardian', href: 'assets/imgs/Angels/Guardians/guardian_1_blue_clouds.jpg'},
      			{category: 'guardian', href: 'assets/imgs/Angels/Guardians/guardian_2_purple.jpg'},
      			{category: 'guardian', href: 'assets/imgs/Angels/Guardians/guardian_3_lightening.jpg'},
      			{category: 'guardian', href: 'assets/imgs/Angels/Guardians/guardian_4.jpg'},
      			{category: 'prayer', href: 'assets/imgs/Angels/Prayers/prayer_1_pink.jpg'},
            {category: 'prayer', href: 'assets/imgs/Angels/Prayers/prayer_2_male.jpg'},
            {category: 'prayer', href: 'assets/imgs/Angels/Prayers/prayer_3_childlike.jpg'},
            {category: 'warrior', href: 'assets/imgs/Angels/Warriors/warrior_1.jpg'},
            {category: 'warrior', href: 'assets/imgs/Angels/Warriors/warrior_2_golden.jpg'},
            {category: 'warrior', href: 'assets/imgs/Angels/Warriors/warrior_3_blue.jpg'},
            {category: 'warrior', href: 'assets/imgs/Angels/Warriors/warrior_4_knight_sword.jpg'}
    		];
  	}

    // Returns a list of all Angels in the selectedCategory
    loadSelected(selectedCategory){
        var listOfSelected: any = [];
        for (var i = 0; i < this.pictureList.length; i++) {
            console.log("Comparing " + this.pictureList[i].category + " to " + selectedCategory)
            if (selectedCategory == this.pictureList[i].category){
                listOfSelected.push(this.pictureList[i]);
            }
        }
        return Promise.resolve(listOfSelected);
    }

    // Returns the list of all Angels
  	loadAll(){
  		  return Promise.resolve(this.pictureList);
  	}
}


