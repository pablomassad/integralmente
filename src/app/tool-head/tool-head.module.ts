import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToolHeadComponent } from './tool-head.component';
import { EditionPage } from './edition.page';


@NgModule({
   imports: [
      CommonModule,
      IonicModule
   ],
   exports: [
      ToolHeadComponent
   ],
   entryComponents: [
      EditionPage
   ],
   declarations: [ToolHeadComponent, EditionPage]
})
export class ToolHeadComponentModule {
   constructor() {
      console.log('ToolHeadComponentModule constructor')
   }
}
