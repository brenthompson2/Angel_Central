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
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

// Pages
import { CategorySelectPage } from '../category-select/category-select';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController, private nativeAudio: NativeAudio, public platform: Platform, public statusBar: StatusBar) {

		platform.ready().then(() => {
            statusBar.styleDefault();
            if (platform.is('android')) {
                statusBar.overlaysWebView(false);
                statusBar.backgroundColorByHexString('#000000');
            }
        });

		var background_music = new Audio("assets/Angel_Central.wav");
		background_music.play();
		background_music.loop = true;

		initializeApp(FIREBASE_CONFIG); // Initialize app w/ firebase
	}

	getStarted(){
		this.navCtrl.push(CategorySelectPage);
	}
}
