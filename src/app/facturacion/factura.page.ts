import { Component, OnInit, OnDestroy } from '@angular/core'
import { GlobalService } from 'fwk4-services'
import { ModalController, NavParams, AlertController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import * as moment from 'moment'
import { FbsService } from 'src/app/fbs.service'
import { Subscription } from 'rxjs'
import { Chooser } from '@ionic-native/chooser/ngx'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'


@Component({
   selector: 'app-factura',
   templateUrl: './factura.page.html',
   styleUrls: ['./factura.page.scss', '../buttons.scss'],
})
export class FacturaPage implements OnInit, OnDestroy {
   factura: any
   isMobile: boolean
   fechaFactura:any

   private sub: Subscription
   private attachmentsPath: string = ''

   constructor(
      private iab: InAppBrowser,
      private chooser: Chooser,
      private alertCtrl: AlertController,
      private navParams: NavParams,
      private modalController: ModalController,
      private globalSrv: GlobalService,
      private afs: AngularFirestore,
      private fbsSrv: FbsService
   ) {
      console.log('FacturaPage constructor')
   }

   ngOnInit() {
      this.isMobile = this.globalSrv.getItemRAM('isMobile')
      this.factura = this.navParams.get('facturaDetail')
      // this.fechaFactura = moment(this.factura.fecha).format("MM/DD/YYYY")
   }
   ngOnDestroy() {
      this.sub.unsubscribe()
   }
   shortName(n) {
      const maxLen = 12
      var ext = n.substring(n.lastIndexOf(".") + 1, n.length).toLowerCase();
      var filename = n.replace('.' + ext, '');
      if (filename.length <= maxLen) {
         return n;
      }
      filename = filename.substr(0, maxLen) + (n.length > maxLen ? '...' : '');
      return filename + '.' + ext;
   }
   chooseFile() {
      this.chooser.getFile('*/*').then(f => {
         this.fbsSrv.startSpinner()
         this.fbsSrv.uploadFile(f, 'facturas').then(obj => {
            this.saveAttachment(obj)
         })
      })
   }
   handleFile(files: FileList) {
      this.fbsSrv.startSpinner()
      this.fbsSrv.uploadFile(files.item(0), 'facturas').then(obj => {
         this.saveAttachment(obj)
      })
   }
   isImage(ext) {
      let flag = false
      if ((ext == 'png') || (ext == 'jpg') || (ext == 'jpeg') || (ext == 'gif'))
         flag = true
      return flag
   }
   openFile(url) {
      this.iab.create(url, '_system')
   }
   async removeFile(fac) {
      const alert = await this.alertCtrl.create({
         header: 'Confirma borrado',
         message: 'Esta seguro?',
         buttons: [
            {
               text: 'Cancel',
               role: 'cancel',
               cssClass: 'secondary',
               handler: (blah) => {
                  console.log('Confirm Cancel');
               }
            }, {
               text: 'Okay',
               handler: async () => {
                  console.log('Confirm Okay')
                  this.fbsSrv.startSpinner()
                  this.fbsSrv.deleteFileStorage('facturas', fac.nombre)
                  await this.afs.doc('facturas/' + fac.id).delete()
                  this.fbsSrv.stopSpinner()
               }
            }
         ]
      })
      await alert.present();
   }

   async save() {
      this.factura.fecha = moment(this.fechaFactura).valueOf()
      if (this.factura['id'] != undefined)
         await this.afs.doc('facturas').set(this.factura, { merge: true })
      else
         await this.afs.collection('facturas').add(this.factura)

      this.modalController.dismiss()
   }
   cancel() {
      this.modalController.dismiss()
   }
   async saveAttachment(obj: any) {
      await this.afs.collection('facturas').doc(obj.id).set(obj)
      this.fbsSrv.stopSpinner()
   }
}
