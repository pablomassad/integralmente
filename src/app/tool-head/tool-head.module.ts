import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToolHeadComponent } from './tool-head.component';


@NgModule({
   imports: [
      CommonModule,
      IonicModule
   ],
   exports: [
      ToolHeadComponent
   ],
   declarations: [ToolHeadComponent]
})
export class ToolHeadComponentModule {
   constructor() {
      console.log('ToolHeadComponentModule constructor')
   }
}
