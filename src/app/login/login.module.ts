import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { LoginPage } from './login.page'
import { RegisterPage } from './register.page'
import { Fwk4AuthenticationModule } from 'fwk4-authentication'

const routes: Routes = [
   {
      path: '',
      component: LoginPage
   }
];

@NgModule({
   imports: [
      CommonModule,
      IonicModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes),
      Fwk4AuthenticationModule
   ],
   entryComponents: [
      RegisterPage
   ],
   declarations: [LoginPage, RegisterPage]
})
export class LoginPageModule {
   constructor() {
      console.log('LoginPageModule constructor')
   }
}
