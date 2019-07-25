import { Component, OnInit } from '@angular/core'
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { GlobalService } from 'fwk4-services'
import { ModalController } from '@ionic/angular'
import { FbsService } from 'src/app/fbs.service'
import { Chooser } from '@ionic-native/chooser/ngx'
import { FirebaseService, UserModel } from 'fwk4-authentication'

@Component({
   selector: 'app-edition',
   templateUrl: './edition.page.html',
   styleUrls: ['./edition.page.scss', '../buttons.scss']
})
export class EditionPage implements OnInit {
   private fileInfo: any
   user: UserModel
   isMobile: boolean
   validations_form: FormGroup
   validation_messages = {
      'displayName': [
         { type: 'required', message: 'Nombre de usuario requerido' }
      ]
   }

   constructor(
      private globalSrv: GlobalService,
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

   chooseFileBrowser(info: File) {
      this.fileInfo = info
   }
   async chooseFileMobile() {
      this.fileInfo = await this.chooser.getFile('*/*')
   }
   changeRole(ev) {
      this.user.isAdmin = ev.target.checked
   }
   async save(value) {
      if (this.fileInfo) {
         if (this.user.photoName)
            await this.fbsSrv.deleteFileStorage('avatars', this.user.photoName)

         const obj = await this.fbsSrv.uploadFile(this.fileInfo, 'avatars')
         this.user.photoURL = obj.url
         this.user.photoName = obj.nombre
      }

      this.user.displayName = value['displayName']
      await this.firebaseSrv.updateUserData(this.user)
      this.modalController.dismiss()
   }
   cancel() {
      this.modalController.dismiss()
   }
}
