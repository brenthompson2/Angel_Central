/*
	File: picture-list.ts
	created: 02/08/18 by Brendan Thompson
	Updated: 04/01/18 by Brendan Thompson

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
            {
               href: 'assets/imgs/Angels/guardian_1_blue_clouds.jpg',
               categoryList: ['guardian'],
            },
            {
               href: 'assets/imgs/Angels/guardian_2_purple.jpg',
               categoryList: ['guardian'],
            },
            {
               href: 'assets/imgs/Angels/guardian_3_lightening.jpg',
               categoryList: ['guardian'],
            },
            {
               href: 'assets/imgs/Angels/guardian_4.jpg',
               categoryList: ['guardian'],
            },
            {
               href: 'assets/imgs/Angels/guardian_angel.jpg',
               categoryList: ['guardian', 'warrior'],
            },
            {
               href: 'assets/imgs/Angels/prayer_1_pink.jpg',
               categoryList: ['prayer'],
            },
            {
               href: 'assets/imgs/Angels/prayer_2_male.jpg',
               categoryList: ['prayer'],
            },
            {
               href: 'assets/imgs/Angels/prayer_3_childlike.jpg',
               categoryList: ['prayer'],
            },
            {
               href: 'assets/imgs/Angels/prayer_white_angel.png',
               categoryList: ['prayer'],
            },
            {
               href: 'assets/imgs/Angels/warrior_1.jpg',
               categoryList: ['warrior'],
            },
            {
               href: 'assets/imgs/Angels/warrior_2_golden.jpg',
               categoryList: ['warrior'],
            },
            {
               href: 'assets/imgs/Angels/warrior_3_blue.jpg',
               categoryList: ['warrior'],
            },
            {
               href: 'assets/imgs/Angels/warrior_4_knight_sword.jpg',
               categoryList: ['warrior'],
            },
            {
               href: 'assets/imgs/Angels/little_boy_warrior.png',
               categoryList: ['warrior'],
            },
        ];
  	}

    // Returns a list of all Angels in the selectedCategory
    loadSelected(selectedCategory){
        var listOfSelected: any = [];
        for (var i = 0; i < this.pictureList.length; i++) {
            for (var j = 0; j < this.pictureList[i].categoryList.length; j++){
                console.log("Comparing " + this.pictureList[i].categoryList[j] + " to " + selectedCategory)
                if (selectedCategory == this.pictureList[i].categoryList[j]){
                    listOfSelected.push(this.pictureList[i].href);
                }
            }
        }
        return Promise.resolve(listOfSelected);
    }

    // Returns the list of all Angels
  	loadAll(){
  		return Promise.resolve(this.pictureList);
  	}
}


