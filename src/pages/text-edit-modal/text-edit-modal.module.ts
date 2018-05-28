import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextEditModalPage } from './text-edit-modal';

@NgModule({
  declarations: [
    TextEditModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TextEditModalPage),
  ],
})
export class TextEditModalPageModule {}
