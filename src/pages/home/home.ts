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

// Pages
import { CategorySelectPage } from '../category-select/category-select';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController) {
		initializeApp(FIREBASE_CONFIG);
	}

	getStarted(){
		this.navCtrl.push(CategorySelectPage);
	}

}
