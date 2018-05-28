import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/*
	File: text-edit-modal.ts
	Created: 05/28/18 by Brendan Thompson
    Updated: 05/28/18 by Brendan Thompson

	Summary: Modal page for editing the text that will go with the image that will get sent
*/

@IonicPage()
@Component({
  	selector: 'page-text-edit-modal',
  	templateUrl: 'text-edit-modal.html',
})
export class TextEditModalPage {

  	private currentText: any = 0;

  	constructor(public navCtrl: NavController,
  				public navParams: NavParams,
  				private view: ViewController) {

  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad TextEditModalPage');
  		this.currentText = this.navParams.get('text');
  	}

  	cancel(){
  		this.view.dismiss();
  	}

  	save(){
  		this.view.dismiss(this.currentText);
  	}

}
