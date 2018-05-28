# DevLog

Development log detailing the daily work done and the references used during the creation of the Guardian Angel Ionic Hybrid Mobile App
Winter-Spring 2018

==================================================================================

## **==================================================**
## **====== 05/28/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	A) Changed Text-Edit UX Again

### Log of activity

##### A) Changed to Modal Text-Edit UX

## **==================================================**
## **====== 05/23/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	A) Formatted home start button
	B) Changed Text-Edit UX

### Log of activity

##### A) Formatted home start button

- height set relative to bottom of screen

	width: 70%;
	margin-left: 15%;
	position: absolute;
	bottom: 25%;

##### B) Changed Text-Edit UX

- changed reset btn to just an icon & outlined
- Added Update btn

## **==================================================**
## **====== 05/16/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	A) Implemented Firebase Storage

### Log of activity

##### A) Implemented Firebase Storage

- When I was struggling before, all of the images were hosted on Firebase Storage and the data was stored on Firebase Database
- The issue was that I was configuring the "Cloud Firestore (BETA)" version instead of the basic "Realtime Database"

1) Install Firebase Dependency

	`npm install firebase`

2) Import Firebase into PictureListProvider

	`import * as firebase from 'firebase';`

3) Get the data stored in firebase

- the reference node snapshot has the categories as children
- each category node snapshot has the associated imgs as children
- For some reason you have to `return false` when using `forEach()`

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

## **==================================================**
## **====== 05/15/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	A) Fixed iOS back btn arrow color
	B) Continued Struggling with Firebase Storage

### Log of activity

##### A) Fixed iOS back btn arrow color

- apps.scss:

	ion-header ion-icon.back-button-icon.icon {
	    color: #fff;
	}

##### B) Continued Struggling with Firebase Storage

- https://youtu.be/urFpUVjLw0Y
1) `npm install firebase`
2) Connect to Firebase Storage & set rules to public
3) Setup Configuration
	- create app/firebase.config.ts
		- get content by clicking "Add Firebase to your web app"
	- call `initializeApp(FIREBASE_CONFIG);` inside constructor for home.ts

4) Imports
	- import { Storage, initializeApp } from 'firebase';
	- import { FIREBASE_CONFIG } from "../../app/firebase.config";

5) Create FirebaseStorageProvider
	- need to implement

6) Able to get 1 image

	try {
        firebase.storage().ref().child('angels/guardians/guardian_4.jpg').getDownloadURL()
            .then((response) => {
                this.finalImage = response;
                console.log(this.finalImage);
            });
    }
    catch (e) {
        console.log(e);
    }

7) Struggled for an hour to read firebase data

##### C) Started building blank firebase database project

- https://youtu.be/I_73tsvj6OI

	ionic start using-firebase blank
	npm install firebase angularfire2
	ionic g provider firebaseService

- Setup Module.ts

	import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
	import { AngularFireDatabaseModule } from 'angularfire2/database';
	import { AngularFireModule } from 'angularfire2';
	import { HttpModule } from '@angular/http';

	const firebaseConfig = {
	    apiKey: "AIzaSyBsV2HP3aN5K7b3C3G1TqNGIsEoUcGty5s",
	    authDomain: "angel-central.firebaseapp.com",
	    databaseURL: "https://angel-central.firebaseio.com",
	    projectId: "angel-central",
	    storageBucket: "angel-central.appspot.com",
	    messagingSenderId: "442168506940"
	};

	import: [
		...
	    HttpModule,
	    AngularFireDatabaseModule,
	    AngularFireModule.initializeApp(firebaseConfig),
    ]

- setup provider

	constructor(public afd: AngularFireDatabase) {
		afd.list('angels').valueChanges().subscribe(console.log);
	}
	- FirebaseListObservable changed to AngularFireList<T>: https://github.com/angular/angularfire2/blob/master/docs/version-5-upgrade.md#updating-firebaselistobservable-to-angularfirelistt
	- "Client doesn't have permission to access the desired data" even though the rules are totally open
		- https://firebase.google.com/docs/firestore/security/get-started?authuser=0

	// Allow read/write access to all users under any conditions
	// Warning: **NEVER** use this rule set in production; it allows
	// anyone to overwrite your entire database.
	service cloud.firestore {
	  match /databases/{database}/documents {
	    match /{document=**} {
	      allow read, write: if true;
	    }
	  }
	}

## **==================================================**
## **====== 05/08/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	A) Made pic-select scrollable
	B) Fixed image
	C) Hid back button
	D) Continued Admob Integration
	E) Started Firebase Storage integration

### Log of activity

##### A) Made pic-select scrollable

- https://forum.ionicframework.com/t/ion-cards-in-a-horizontal-scroll-possible/84746/7

	<ion-scroll scrollX="true" direction="x" *ngIf="pictureList != 0">
		<ng-container *ngFor="let picture of pictureList">
		    <ion-card (click)="selectPicture(picture)" class="picture-thumbnail" [ngClass]="getSelectStatus(picture) ? 'picture-thumbnail-selected' : 'picture-thumbnail'">
				<img src="{{ picture }}">
			</ion-card>
		</ng-container>
	</ion-scroll>

##### B) Fixed image

- guardian-angel.jpg had bad dimensions, downloaded the better version

##### C) Hid back button

- since there is a "send the same angel again" button, it is cleaner to not have a back button

##### D) Continued Admob Integration

- Banners & Interstitials working with google's sample `ad unit ID`s: https://developers.google.com/admob/android/test-ads#sample_ad_units
- Banners working with custom `ad unit ID`
- Interstitials `NOT` working with custom `ad unit ID`
- created and used a different banner `ad unit ID` for every single page for each os (4 x 2)
- created and used a different interstitial `ad unit ID` for each os (1 x 2)

##### E) Started Firebase Storage integration

- https://youtu.be/urFpUVjLw0Y
1) `npm install firebase`
2) Connect to Firebase Storage & set rules to public
3) Setup Configuration
	- create app/firebase.config.ts
		- get content by clicking "Add Firebase to your web app"
	- call `initializeApp(FIREBASE_CONFIG);` inside constructor for home.ts

4) Add Imports
	- import { Storage, initializeApp } from 'firebase';
	- import { FIREBASE_CONFIG } from "../../app/firebase.config";

5) Create FirebaseStorageProvider
	- need to implement

## **==================================================**
## **====== 05/06/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	A) Integrated more Admob test ads
	B) Fixed text-edit auto-update
	C) Fixed Text-Overflow bug

### Log of activity

##### A) Integrated more Admob test ads

	- Added constantly refreshing Banner ads to the pic-select, text-select, confirm, and final pages
	- Probably need to set up the bank account info to get the official ads

##### B) Fixed text-edit auto-update

	- Switched from calling `drawTheImage()` with the `input` ion-input event call-back to `change`
	- `<ion-textarea [(ngModel)]="currentText.text" type="text" (change)="drawTheImage()">`

##### C) Fixed Text-Overflow bug

	- Before, once a line was full it would print it
	- now, once a line is full it adds it to a list of lines
	- then it starts printing the lines from `y = canvasHeight - (numLines * lineHeight))`

## **==================================================**
## **====== 05/05/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	A) Integrated Admob test ads

### Log of activity

##### A) Integrated Admob test ads

https://dev.to/hitman666/how-to-make-money-with-google-admob-ads-in-ionic-framework-3

1) Install Dependencies
	https://ionicframework.com/docs/native/admob-free/
	`ionic cordova plugin add cordova-plugin-admob-free`
	`npm install --save @ionic-native/cordova-plugin-admob-free`

2) Add package to app.module.ts
	- `import { AdMobFree } from '@ionic-native/admob-free';`
	- add `AdMobFree` to the providers array

3) Add package to the page
	- `import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';`
	- `public admobFree: AdMobFree` as constructor param

4) Call function upon page enter

    ionViewDidEnter(){
        // Show Banner Ad
        this.platform.ready().then(() => {
            if(this.platform.is('mobile')){
                this.showBannerAd();
            }
        });
    }

5) Create functions for showing banners and interstitial ads

    showBannerAd(){
        let bannerConfig: AdMobFreeBannerConfig = {
            isTesting: true, // Remove in production
            autoShow: true
            // id: 'ca-app-pub-9786610691421616/5622014155'
        };
        this.admobFree.banner.config(bannerConfig);
        this.admobFree.banner.prepare().then(() => {
            // success
        }).catch(e => console.log(e));
    }

    // Displays an interstitial (full page) Admob add
    launchInterstitialAd() {
        let interstitialConfig: AdMobFreeInterstitialConfig = {
            // id: 'ca-app-pub-9786610691421616/5622014155',
            isTesting: true,
            autoShow: true
        };
        this.admobFree.interstitial.config(interstitialConfig);
        this.admobFree.interstitial.prepare()
        .then(() => {
            this.admobFree.interstitial.show()
        })
        .catch(e => console.log(e));
    }

## **==================================================**
## **====== 04/01/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	A) Brought back NavBar color
	B) Re-organized PictureList data
	C) Added Latest Images

### Need to Implement:

Functionality:

	- Link to "Buy Album"
	- "You Are Loved" splash screen
	- On Hold:
		- Get Images from Firebase
		- Get Texts from Firebase

Design:

	- Need scrolling for pic-select & text-select
	- Italics for text

BackEnd:

	- Firebase?
	- Currently saved within the app

### Log of activity

##### Brought back NavBar color

##### Re-organized PictureList data

	- Each picture has a list of categories
	- passing just the actual href, not the whole object

##### Added Latest Images

==================================================================================

## **==================================================**
## **====== 03/02/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	A) Removed unnecessary headings
	B) Designed Angel
	C) Hid text select (since only 1 option)
	D) Changed text edit to a box
	E) Highlighted Selected Image

### Need to Implement:
Functionality:

	- Link to "Buy Album"
	- Allow editing text after selected
	- "You Are Loved" splash screen
	- On Hold:
		- Get Images from Firebase
		- Get Texts from Firebase

Design:

	- Need scrolling for pic-select & text-select
	- Italics for text

BackEnd:

	- Firebase?
	- Currently saved within the app

### Log of activity

##### Simplified Design

	A) Removed unnecessary headings
		- Interface is simpler without them
			- should make it obvious what to do
		- "The Angel:" above the Angel display
		- "Click on the Angel to Select:" about pic & text selection
		- "Confirm the mission of this Angel" on confirm page

	B) Added whitespace
		- removed toolbar colors
		- removed removed black backgrounds

##### Hid text select (since only 1 option)

	- just commented it out

##### Designed Angel

	A) text wrapping:
		- https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
	B) canvas height & width:
	    private pictureWidth: 760;
	    private pictureHeight: 1400;
    C) canvas background color rgba(255, 255, 255, 1)
    D) Font italic, 70px, white, black border
    E) Text location = bottom 1/4th
    F) Border width = 2.2
    	- https://www.w3schools.com/tags/canvas_linewidth.asp

##### Changed text edit to a box

	A) <ion-textarea>
	B) Added button to reset for if edited
	C) Started re-setting the textY for the first line

##### Highlighted Selected Image

	- [ngClass]="getSelectStatus(picture) ? 'picture-thumbnail-selected' : 'picture-thumbnail'"
	- from Awesome Check In team select

## **==================================================**
## **====== 02/26/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	- Fixed for successful android deployment
	- Changed text to mockup
	- Added ability to customize text

### Need to Implement:
Functionality:

	- Link to "Buy Album"
	- Allow editing text after selected
	- "You Are Loved" splash screen
	- On Hold:
		- Get Images from Firebase
		- Get Texts from Firebase

Design:

	- Dynamically break up text into multiple lines
	- Need scrolling for pic-select & text-select
	- Italics for text

BackEnd:

	- Firebase?
	- Currently saved within the app

### Log of activity

##### Fixed for successful android deployment

- `background-image: url("../assets/imgs/page_1_angel_app.jpg");`

###### Changed text to mockup

- set instructional text to same as mockup

##### Added ability to customize text

- Added input to text-select.html and mapped to variables/functions

    <!-- Text Edit -->
    <ion-item *ngIf="textList != 0">
        <ion-label>Edit the Text:</ion-label>
        <ion-input [(ngModel)]="currentText.text" type="text">
        </ion-input>
        <button ion-button item-end (click)="drawTheImage()">Update</button>
    </ion-item>

- learned how to shallow copy

	this.currentText = Object.assign({}, this.textList[0]);




## **==================================================**
## **====== 02/21/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	- Implemented Homepage
	- Renamed to Angel Central
	- Implemented Final Page
	- Added official Text
	- Designed Navbar

### Need to Implement:
Functionality:

	- Link to "Buy Album"
	- Allow editing text after selected
	- "You Are Loved" splash screen
	- On Hold:
		- Get Images from Firebase
		- Get Texts from Firebase

Design:

	- Dynamically break up text into multiple lines
	- Need scrolling for pic-select & text-select

BackEnd:

	- Firebase?
	- Currently saved within the app

### Log of activity

##### Implemented Homepage

	- used image & added text

##### Implemented Final Page

	- changed btn text to Send Another Angel
	- added Buy Album button
		- still need to implement

##### Added official Text

	- added to text-list.ts
		- created categories and loadSelected(selectedCategory)
	- Passed the category from pic-select to text-select
	- loading only category specific

##### Designed Navbar & Buttons

	- set nav colors in variables.scss
	- set button text colors in variables.scss

##### Linked to itunes

	- ionic cordova plugin add cordova-plugin-inappbrowser
	- npm install --save @ionic-native/in-app-browser


## **==================================================**
## **====== 02/21/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	- Added current Angels
	- Reset theme primary color: #99ddff

### Need to Implement:
Functionality:

	- Allow editing text after selected
	- On Hold:
		- Get Images from Firebase
		- Get Texts from Firebase

Design:

	- Homepage from mockup
	- Final page from mockup
	- Need scrolling for pic-select & text-select

BackEnd:

	- Firebase?
	- Currently saved within the app

### Log of activity

##### Implemented Path Selection flow

1) ionic generate page category-select

2) Designed UI

3) Passed selectedCategory to PicSelectPage

##### Added current Angels

1) added them all to assets/imgs/Angels/

2) read them in using PictureListProvider and created 'category' field

3) created loadSelected(selectedCategory)

4) Called it in PicSelectPage

## **==================================================**
## **====== 02/20/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	- Implemented Image Flattening
	- Simplified Data Model
	- Removed Recipient-Select Page & Provider
	- Started Design

### Need to Implement:
Functionality:

	- Implement Intended Flow
		- Choose warrior, guardian, or prayer
		- Choose Text & then allow editing
	- Get Images from Firebase
	- Get Texts from Firebase

Design:

	- Need scrolling for pic-select & text-select
	- See Flow of App on Trello

BackEnd:

	- Firebase?
	- Some pics are on Trello

### Log of activity

##### Implemented Image Flattening

- Flattened the image in new blank project (flattenTest)
- Implemented that code in Confirm page
- Moved the Canvas to pic-select & text-select pages and only pass the img to Confirm & Final pages

1) Import ElementRef & ViewChild for accessing the Canvas

	import { ElementRef, ViewChild } from '@angular/core';

2) Add ElementRef to constructor

	private elementReference: ElementRef

3) Access the Canvas & create member variables

    @ViewChild('myCanvas') canvasEl: ElementRef;
    private theCanvas: any;
    private theContext: any;
    private finalImage: any;

4) Call the initialization from ionViewDidLoad()

    ionViewDidLoad(){
        this.initialiseCanvas();
    }

5) Initialize the Canvas

    initialiseCanvas(){
        this.theCanvas = this.canvasEl.nativeElement;
        this.theCanvas.width = window.innerWidth;
        this.theCanvas.height = window.innerHeight;
        if(this.theCanvas.getContext){
            this.theContext = this.theCanvas.getContext('2d');
            this.drawTheImage();
        }
    }

6) Draw the Image

    drawTheImage(){
        // Display the Image
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = (event) => {
            this.theContext.drawImage(img, this.theCanvas.width/2 - img.width/2, this.theCanvas.height/2 - img.height/2);
            this.drawText();
        };
        img.src=this.selectedPicture;
    }

7) Draw the Text

    drawText(){
        this.theContext.strokeStyle = "rgba(256, 0, 0, 1.0)";
        this.theContext.font = "50px Arial";
        this.theContext.textAlign = "center";
        this.theContext.strokeText(this.selectedText.text, this.theCanvas.width/2, this.theCanvas.height/2);
        this.saveCanvas();
    }

8) Set the finalImage given the Canvas

    saveCanvas(){
        this.finalImage = this.theCanvas.toDataURL();
    }

##### Simplified Data Model

- Moved the Canvas to pic-select & text-select pages and only pass the img to Confirm & Final pages

##### Started Design

- set primary color in /theme/variables.scss to #ff0000
- variables for Canvas style
	- width
	- height
	- font
	- font color
- Centered images

## **==================================================**
## **====== 02/18/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	- Learned how to use the Canvas
	- Learned how to draw the Image & Text centered on the canvas
	- See canvas-tutorial directory

## **==================================================**
## **====== 02/13/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	- Implemented Sharing (images not working well)
	- Learned Facebook doesn't allow prefilling the comment when sharing

### Need to Implement:
Functionality:

	- Get Images from Firebase
	- Get Texts from Firebase
	- Flatten the text onto the image
	- Figure out using Image when sharing

Design:

	- Currently isn't one

BackEnd:

	- Firebase?

### Log of activity

##### Started Sharing to Facebook

- https://ionicframework.com/docs/native/facebook/
- https://www.youtube.com/watch?v=tCaj70w26As
- Not allowed to prefill captions, comments, messages, or the user message parameter of posts with content, even if the person can edit or remove the content before sharing.
	- https://developers.facebook.com/policy/#integration

A) Import Social Sharing

	- ionic cordova plugin add cordova-plugin-x-socialsharing
	- npm install --save @ionic-native/social-sharing
	- Import to app.module.ts: import { SocialSharing } from '@ionic-native/social-sharing';
	- Add to list of Providers: SocialSharing

B) Implement Social Sharing in confirm.ts

	- Import to confirm.ts: import { SocialSharing } from '@ionic-native/social-sharing';
	- Add to constructor: public sharing: SocialSharing)

C) Write function to post to Facebook

    shareToFacebook(){
        this.mySharing.shareViaFacebookWithPasteMessageHint("I am sending you this Guardian Angel ", this.selectedPicture.href, null)
            .then(() => {
                console.log("Sent Via Facebook");

            })
            .catch((error) =>{
                console.log(error);
            });
    }


##### Implemented all sorts of sharing possibilities

- https://ionicframework.com/docs/native/social-sharing/
- share()
- shareViaTwitter()
- shareViaInstagram()

## **==================================================**
## **====== 02/08/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
	- Created overall layout of the App
	- Started PicSelectPage & created PictureListProvider
	- Started TextSelectPage & created TextListProvider
	- Started RecipientSelectPage & created RecipientListProvider
	- Started ConfirmPage

### Need to Implement:
Functionality:

	- Get Images from Firebase
	- Get Texts from Firebase
	- Flatten the text onto the image
	- Send the Guardian Angel to someone

Design:

	- Currently isn't one

BackEnd:

	- Firebase?

### Log of activity

##### Started PicSelectPage & Created PictureListProvider

Getting a list from a provider

- How to get data from a provider: [Passing Data Between Pages: Ionic 2, by Satish B](https://www.youtu.be/oJtS8fHR1Co)
	- create loadAll() fn within provider
	  	`loadAll(){
	  		return Promise.resolve(this.pictureList);
	  	}`

	- Get the data in pic-select.ts
		`pictureListProviderObject.loadAll().then(result =>{
  			this.pictureList = result;
  		});`

- How to Get an image to display based on a JSON src: [Stack Overflow](https://stackoverflow.com/questions/43882578/unable-to-use-ng-src-cant-bind-to-ng-src-since-it-isnt-a-known-property)

	<img *ngIf="currentPicture != 0" [attr.src]="currentPicture.href">

##### Started TextSelectPage & Created TextListProvider

##### Started RecipientSelectPage & created RecipientListProvider

##### Started ConfirmPage



## **==================================================**
## **====== 02/07/18 = Brendan Thompson ======**
## **==================================================**

### Summary:
- Created Project and Github Repo
	- Made baby steps on the Project

### Need to Implement:

Functionality:

	- Let the user select an image
		- Get images as an array from a provider
	- Let the user select a text
		- Get texts as an array from a provider
	- Flatten the text onto the image
	- Send the Guardian Angel to someone

Design:

	- Currently isn't one

BackEnd:

	- Firebase?

### Log of activity

Struggled linking git repositories
Removed tabs from app.component.ts & app.module.ts
Started Implementing General Project

	- ID, Name, Description
