import { Component, OnInit } from '@angular/core'
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { GlobalService, ApplicationService } from 'fwk4-services'
import { ModalController, NavParams, AlertController } from '@ionic/angular'
import { FbsService } from 'src/app/fbs.service'
import { Chooser } from '@ionic-native/chooser/ngx'
import { FirebaseService, UserModel } from 'fwk4-authentication'

@Component({
   selector: 'app-edition',
   templateUrl: './edition.page.html',
   styleUrls: ['./edition.page.scss', '../buttons.scss']
})
export class EditionPage implements OnInit {
   user: UserModel
   isMobile: boolean
   selRole: string = 'Usuario'
   isAdmin: boolean = false
   fotoUrl: string = "assets/images/anonymous.png"
   validations_form: FormGroup
   validation_messages = {
      'displayName': [
         { type: 'required', message: 'Nombre de usuario requerido' }
      ]
   }

   constructor(
      private globalSrv: GlobalService,
      private appSrv: ApplicationService,
      private formBuilder: FormBuilder,
      private chooser: Chooser,
      private fbsSrv: FbsService,
      private firebaseSrv: FirebaseService,
      private modalController: ModalController
   ) {
      console.log('EditionPage constructor')
   }

   async ngOnInit() {
      this.isMobile = this.globalSrv.getItemRAM('isMobile')
      this.user = this.globalSrv.getItemRAM('userInfo')

      this.validations_form = this.formBuilder.group({
         displayName: new FormControl({ value: this.user.displayName }, Validators.compose([
            Validators.required
         ])),
         isAdmin: new FormControl({ value: this.user.isAdmin, disabled: true }, Validators.compose([
            Validators.required
         ]))
      })
      // this.validations_form.setValue({ displayName: this.user.displayName, isAdmin: this.user.isAdmin });
   }

   chooseFile() {
      this.chooser.getFile('*/*')
         .then(foto => {
            if (foto) this.savePhoto(foto)
         })
         .catch(err => {
            this.appSrv.message('Ocurrio un error al seleccionar foto', 'error')
            console.log('Error Foto: ', err)
         })
   }
   handleAvatar(files: FileList) {
      this.savePhoto(files.item(0))
   }
   changeRole(ev) {
      this.user.isAdmin = ev.target.checked
   }
   async save(value) {
      this.user.displayName = value['displayName']
      await this.firebaseSrv.updateUserData(this.user)
      this.modalController.dismiss()
   }
   cancel() {
      this.modalController.dismiss()
   }

   private async savePhoto(file) {
      const obj = await this.fbsSrv.uploadFile(file, 'avatars')
      this.user.photoName = obj.nombre
      this.user.photoURL = obj.url
   }
}
