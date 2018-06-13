/*
	File: home.ts
	Updated: 02/07/18 by Brendan Thompson
	Updated: 02/08/18 by Brendan Thompson

	Summary: Homepage for the Guardian Angel App
*/

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { initializeApp } from 'firebase';
import { FIREBASE_CONFIG } from "../../app/firebase.config";
import { NativeAudio } from '@ionic-native/native-audio';

// Pages
import { CategorySelectPage } from '../category-select/category-select';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController,
				private nativeAudio: NativeAudio) {

		this.nativeAudio.preloadComplex('bckgrndMusic', '../../assets/Angel_Central.wav', 1, 1, 0).then(
			function(msg){
				console.info(msg) // load succeeded
				this.nativeAudio.loop('bckgrndMusic');
            },
			function(msg){
				console.info(msg) // load failed
			}
		);


		initializeApp(FIREBASE_CONFIG); // Initialize app w/ firebase
	}

	getStarted(){
		this.navCtrl.push(CategorySelectPage);
	}
}
