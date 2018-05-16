/*
	File: picture-list.ts
	created: 02/08/18 by Brendan Thompson
    Updated: 05/16/18 by Brendan Thompson

	Summary: PictureListProvider gets the pictures (from firebase & local storage)
*/

// Imports
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import * as firebase from 'firebase';

@Injectable()
export class PictureListProvider {

    // ==============================================
    // Member Variables
    // ==============================================

    // Lists of the pictures
	pictureList: any;
    guardiansList: any = [];
    warriorsList: any = [];
    prayersList: any = [];

    // ==============================================
    // Constructor
    // ==============================================
  	constructor() {
        this.initData_local();
        this.getData_FirebaseDatabase();
  	}

    // ==============================================
    // Load from Firebase
    // ==============================================

    getData_FirebaseDatabase(){
        try {
            firebase.database().ref().once('value', (snapshot) => {
                snapshot.forEach((categorySnap) => {

                    switch (categorySnap.key) {
                        case "guardians":
                            categorySnap.forEach((imgSnap) => {
                                this.guardiansList.push(imgSnap.val());
                                return false;
                            });
                            break;
                        case "warriors":
                            categorySnap.forEach((imgSnap) => {
                                this.warriorsList.push(imgSnap.val());
                                return false;
                            });
                            break;
                        case "prayers":
                            categorySnap.forEach((imgSnap) => {
                                this.prayersList.push(imgSnap.val());
                                return false;
                            });
                            break;
                        default:
                            console.log("Found Unknown Key");
                            break;
                    }

                    return false;
                });
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    // FROM FIREBASE DATABASE: Returns a list of all Angels in the selectedCategory
    loadSelected(selectedCategory){
        switch (selectedCategory) {
            case "guardian":
                return Promise.resolve(this.guardiansList);
            case "warrior":
                return Promise.resolve(this.warriorsList);
            case "prayer":
                return Promise.resolve(this.prayersList);
            default:
                console.log("Found Unknown Key");
                return Promise.resolve(this.loadSelected_local(selectedCategory));
        }
    }

    // getImage(){
    //     var dataRef: any;
    //     var imageFromStorage: any;
    //     try {
    //         firebase.storage().ref().child('angels/little_boy_warrior.png').getDownloadURL()
    //             .then((response) => {
    //                 imageFromStorage = response;
    //                 console.log("Image URL: " + imageFromStorage);
    //             });

    //         dataRef = firebase.storage().ref('/angels');
    //         console.log("Data Ref: " + dataRef);
    //         console.log("Data Ref.fullPath: " + dataRef.fullPath);
    //         console.log("Data Ref.name: " + dataRef.name);
    //         console.log("Data Ref.bucket: " + dataRef.bucket);
    //     }
    //     catch (e) {
    //         console.log("Error: " + e);
    //     }
    // }

    // ==============================================
    // Load from Internal Storage
    // ==============================================

    // Setup pictureList from internal storage
    initData_local(){
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

    // FROM LOCAL STORAGE: Returns a list of all Angels in the selectedCategory
    loadSelected_local(selectedCategory){
        var listOfSelected: any = [];
        for (var i = 0; i < this.pictureList.length; i++) {
            for (var j = 0; j < this.pictureList[i].categoryList.length; j++){
                // console.log("Comparing " + this.pictureList[i].categoryList[j] + " to " + selectedCategory)
                if (selectedCategory == this.pictureList[i].categoryList[j]){
                    listOfSelected.push(this.pictureList[i].href);
                }
            }
        }
        return Promise.resolve(listOfSelected);
    }
}


