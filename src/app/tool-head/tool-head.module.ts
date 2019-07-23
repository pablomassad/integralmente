import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { EditionPage } from './edition.page'
import { ToolHeadComponent } from './tool-head.component'


@NgModule({
   imports: [
      CommonModule,
      IonicModule,
      FormsModule
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
