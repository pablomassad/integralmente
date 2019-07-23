import { Component, OnInit, OnDestroy } from '@angular/core'
import { GlobalService, ApplicationService } from 'fwk4-services'
import { ModalController, NavParams, AlertController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import * as moment from 'moment'
import { FbsService } from 'src/app/fbs.service'
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

   constructor(
      private iab: InAppBrowser,
      private chooser: Chooser,
      private alertCtrl: AlertController,
      private navParams: NavParams,
      private modalController: ModalController,
      private globalSrv: GlobalService,
      private appSrv: ApplicationService,
      private afs: AngularFirestore,
      private fbsSrv: FbsService
   ) {
      console.log('FacturaPage constructor')
   }

   ngOnInit() {
      this.isMobile = this.globalSrv.getItemRAM('isMobile')
      this.factura = this.navParams.get('facturaDetail')
      this.fechaFactura = moment(this.factura.fecha).format("MM/DD/YYYY")
      if (!this.factura['id']){
         this.factura.estado = "Pendiente"
      }
   }
   ngOnDestroy() {
   }
   changeState(ev){
      this.factura.estado = (ev.target.checked == true)?'Cobrada':'Pendiente'
   }
   chooseFile() {
      this.chooser.getFile('*/*').then(f => {
         if (f) this.saveFactura(f)
      })
      .catch(err=>{
         this.appSrv.hideLoading()
      })
   }
   handleFile(files: FileList) {
      this.saveFactura(files.item(0))
   }
   openFile(url) {
      this.iab.create(url, '_system')
   }
   onObsChanged(ev) {
      this.factura.observaciones = ev.target.value
   }

   async save() {
      this.factura.fecha = moment(this.fechaFactura).valueOf()
      if (this.factura['id'] != undefined)
         await this.afs.doc('facturas/'+this.factura.id).set(this.factura, { merge: true })
      else{
         const alert = await this.alertCtrl.create({
            header: 'Alerta',
            subHeader: 'No esta la factura',
            message: 'Debe cargar una factura para grabar',
            buttons: ['OK']
          });
      
          await alert.present()
      }
      this.modalController.dismiss()
   }
   cancel() {
      this.modalController.dismiss()
   }
   saveFactura(file: any) {
      this.appSrv.showLoading()
      this.fbsSrv.deleteFileStorage('facturas', this.factura.nombre)
      this.fbsSrv.uploadFile(file, 'facturas').then(async obj => {
         const doc = await this.afs.collection('facturas').add(obj)
         this.factura.id = doc.id
         this.factura.nombre = obj.nombre
         this.factura.url = obj.url
         this.appSrv.hideLoading()
      })
   }
}
