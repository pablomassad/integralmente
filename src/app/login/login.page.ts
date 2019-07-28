import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { AuthService } from 'fwk4-authentication'
import { Router } from '@angular/router'
import { ApplicationService } from 'fwk4-services'
import { ModalController } from '@ionic/angular'
import { RegisterPage } from './register.page'


@Component({
   selector: 'app-login',
   templateUrl: './login.page.html',
   styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   validations_form: FormGroup

   validation_messages = {
      'email': [
         { type: 'required', message: 'El correo electrónico es requerido' },
         { type: 'minlength', message: 'El correo electrónico debe tener al menos 5 caracteres' },
         { type: 'maxlength', message: 'El correo electrónico no puede superar los 50 caracteres' },
         { type: 'pattern', message: 'Por favor ingrese un email correcto' }
      ],
      'password': [
         { type: 'required', message: 'Contraseña requerida' },
         { type: 'minlength', message: 'La contraseña debe tener al menos 5 caracteres' },
         { type: 'maxlength', message: 'La contraseña no puede superar los 20 caracteres' }
      ]
   }

   constructor(
      private appSrv: ApplicationService,
      private authSrv: AuthService,
      private modalController: ModalController,
      private route: Router,
      private formBuilder: FormBuilder
   ) {
      console.log('LoginPage constructor')
      this.appSrv.configLoading('p&pSoft.png', 'spinnerClass', 'spinnerCss')

      this.validations_form = this.formBuilder.group({
         email: new FormControl('',
            Validators.compose([
               Validators.required,
               Validators.minLength(5),
               Validators.maxLength(50),
               Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
         password: new FormControl('',
            Validators.compose([
               Validators.minLength(5),
               Validators.maxLength(20),
               Validators.required
            ])),
      })
      //this.validations_form.setValue({ password: 'xxxxx', email: 'pepepe@gmail.com' });
   }

   async ngOnInit() {
      //let u = await this.authSrv.isAuthenticated()
      //console.log('afAuth user: ', u)  // return firebase.user = null or data
      let usr = await this.authSrv.loggedUser()  // return UserModel null or data (getUser() return undefined or data)
      console.log('firebase.user: ', usr)
      if (usr) this.route.navigate(['/menu/home'])
   }

   async tryEmailLogin(value) {
      try {
         await this.authSrv.doLogin(value)
         this.route.navigate(['/menu/home'])
      } catch (error) {
         this.appSrv.message('Usuario o contraseña inválidos', 'error')
      }
   }

   async gotoRegister() {
      try {
         const modal = await this.modalController.create({
            component: RegisterPage,
            componentProps: {}
         })
         return await modal.present()
      } catch (error) {
         console.log('Registration error: ', error)
         this.appSrv.message('El usuario ya existe', 'error')
      }
   }


   // async tryFacebookLogin() {
   //    this.user = await this.authSrv.doFacebookLogin()
   //    this.goHome()
   // }
   // async tryGoogleLogin() {
   //    this.user = await this.authSrv.doGoogleLogin(environment.googleWebClientId)
   //    this.goHome()
   // }
}
