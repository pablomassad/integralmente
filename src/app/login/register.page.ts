import { Component, OnInit } from '@angular/core'
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { AuthService } from 'fwk4-authentication'
import { GlobalService } from 'fwk4-services'
import { ModalController} from '@ionic/angular'
import { FbsService } from 'src/app/fbs.service'
import { Chooser } from '@ionic-native/chooser/ngx'

@Component({
   selector: 'app-register',
   templateUrl: './register.page.html',
   styleUrls: ['./register.page.scss', '../buttons.scss']
})
export class RegisterPage implements OnInit {
   private fileInfo:any
   private isAdmin: boolean = false   

   isMobile: boolean
   fotoUrl: string = "assets/images/anonymous.png"
   validations_form: FormGroup
   validation_messages = {
      'displayName': [
         { type: 'required', message: 'Nombre de usuario requerido' }
      ],
      'email': [
         { type: 'required', message: 'Email requerido' },
         { type: 'pattern', message: 'Ingrese un email válido' }
      ],
      'password': [
         { type: 'required', message: 'Password requerido' },
         { type: 'minlength', message: 'Password debe tener un min. de 5 caracteres' }
      ]
   }

   constructor(
      private globalSrv: GlobalService,
      private formBuilder: FormBuilder,
      private chooser: Chooser,
      private fbsSrv: FbsService,
      private modalController: ModalController,
      private authService: AuthService,
   ) {
      console.log('RegisterPage constructor')
   }

   async ngOnInit() {
      this.isMobile = this.globalSrv.getItemRAM('isMobile')
      this.validations_form = this.formBuilder.group({
         displayName: new FormControl('', Validators.compose([
            Validators.required
         ])),
         email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
         ])),
         password: new FormControl('', Validators.compose([
            Validators.minLength(5),
            Validators.required
         ])),
      })
   }

   chooseFileBrowser(info: File) {
      this.fileInfo = info
   }
   async chooseFileMobile() {
      this.fileInfo = await this.chooser.getFile('*/*')
   }
   changeRole(ev){
      this.isAdmin = ev.target.checked
   }
   async save(value) {
      if (this.fileInfo) {
         const obj = await this.fbsSrv.uploadFile(this.fileInfo, 'avatars')
         value['photoURL'] = obj.url
         value['photoName'] = obj.nombre
      }
      value['isAdmin'] = this.isAdmin
      await this.authService.doRegister(value)
      this.modalController.dismiss()
   }
   cancel() {
      this.modalController.dismiss()
   }
}
