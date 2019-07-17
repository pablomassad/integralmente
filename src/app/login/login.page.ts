import { Component, OnInit } from '@angular/core'
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { UserModel, AuthService } from 'fwk4-authentication'
import { Router } from '@angular/router'
import { GlobalService, ApplicationService } from 'fwk4-services'


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

   user: UserModel = new UserModel()

   constructor(
      // private authSrv: AuthService,
      private route: Router,
      private formBuilder: FormBuilder,
      private globalSrv: GlobalService
   ) {
      console.log('LoginPage constructor')
   }

   ngOnInit() {
      // this.userSrv.getCurrentUser().then(u => {
      //    this.user = u
      //    console.log('current user: ', u)
      // })

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

   async tryEmailLogin(value) {
      console.log('form data: ', value)
      // this.user = await this.authSrv.doLogin(value)
      this.goMenu()
   }

   goRegisterPage() {
      //this.route.navigate(['/register'])
   }

   private goMenu() {
      this.globalSrv.setItem('user', this.user)
      this.route.navigate(['/menu/pacientes'])
   }
}
