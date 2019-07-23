import { Component, OnInit } from '@angular/core'
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { AuthService } from 'fwk4-authentication'
import { Router } from '@angular/router'
import { GlobalService, ApplicationService } from 'fwk4-services'
import { ModalController } from '@ionic/angular';
import { RegisterPage } from './register.page';
import { FbsService } from '../fbs.service';


@Component({
   selector: 'app-login',
   templateUrl: './login.page.html',
   styleUrls: ['./login.page.scss', '../buttons.scss'],
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
      private fbsSrv: FbsService,
      private authSrv: AuthService,
      private modalController: ModalController,
      private route: Router,
      private formBuilder: FormBuilder
   ) {
      console.log('LoginPage constructor')
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
      this.appSrv.showLoading()
      let usr = await this.authSrv.loggedUser()
      if (usr != null) {
         this.route.navigate(['/menu/pacientes'])
      }
      this.appSrv.hideLoading()
   }

   async tryEmailLogin(value) {
      try {
         this.appSrv.showLoading()
         await this.authSrv.doLogin(value)
         this.route.navigate(['/menu/pacientes']) 
      } catch (error) {
         this.appSrv.hideLoading()
         this.appSrv.message('Usuario o contraseña inválidos', 'error')
      }
   }

   async gotoRegister() {
      const modal = await this.modalController.create({
         component: RegisterPage,
         componentProps: {}
      })
      return await modal.present()
   }
}
