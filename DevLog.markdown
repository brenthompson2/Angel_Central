# DevLog

### Development log detailing the daily work done and the references used during the creation of the Guardian Angel Ionic Hybrid Mobile App
### Winter 2018

==================================================================================


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
