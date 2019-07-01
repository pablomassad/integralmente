import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router';
// import { HomePageRoutingModule } from './home.router.module'

import { HomePage } from './home.page';

const routes: Routes = [
   {
     path: '',
     component: HomePage
   }
 ];
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
   //  HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
