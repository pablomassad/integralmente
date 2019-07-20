import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import { FacturaPage } from './factura.page'

@Component({
   selector: 'app-facturacion',
   templateUrl: './facturacion.page.html',
   styleUrls: ['./facturacion.page.scss', '../buttons.scss'],
})
export class FacturacionPage implements OnInit {
   facturasPendientes: any = []
   facturasCobradas: any = []

   totalPendientes:number = 0
   totalCobradas:number = 0

   criteria:string = "OSDE"
   
   constructor(
      private modalController: ModalController,
      private afs: AngularFirestore,
   ) {
      console.log('FacturacionPage constructor')
   }

   filterCriteria(arr:any[], totField:string){
      const res = arr.filter(item => {
         if (!this.criteria) this.criteria = ""
         let str = JSON.stringify(item).toLowerCase()
         const idx = str.indexOf(this.criteria.toLowerCase())
         return (idx !== -1)
      })
      this[totField] = res.reduce((total, item)=> {
         return total + item['monto'];
      },0)
      return res
   }

   ngOnInit() {
      this.facturasPendientes = this.getFacturasPendientesMock()
      this.facturasCobradas = this.getFacturasCobradasMock()

      // this.afs.collection('facturas').ref.where('estado' == 'pendientes').valueChanges({ idField: 'id' }).subscribe(ses=>{
      //    this.facturasPendientes = ses 
      // })

      // this.afs.collection('facturas').ref.where('estado' == 'cobradas').valueChanges({ idField: 'id' }).subscribe(ses=>{
      //    this.facturasCobradas = ses 
      // }) 
   }

   async gotoFactura(fac) {
      const modal = await this.modalController.create({
         component: FacturaPage,
         componentProps: {
            'facturaDetail':fac
          }
      })
      return await modal.present()
   }


   private getFacturasPendientesMock() {
      const arr = [
         { id:'14343432aaa', fecha: 1563374931927, monto: 3500, obrasocial: 'OSDE', estado: 'pendiente' },
         { id:'24343432aaa', fecha: 1563374821927, monto: 9500, obrasocial: 'OSDE', estado: 'pendiente' },
         { id:'34343432aaa', fecha: 1563364531927, monto: 1100, obrasocial: 'IOMA', estado: 'pendiente' },
         { id:'44343432aaa', fecha: 1563364431927, monto: 1500, obrasocial: 'Swiss', estado: 'pendiente' },
         { id:'54343432aaa', fecha: 1563354331927, monto: 4500, obrasocial: 'Swiss', estado: 'pendiente' },
         { id:'64343432aaa', fecha: 1563344231927, monto: 6100, obrasocial: 'IOMA', estado: 'pendiente' },
         { id:'74343432aaa', fecha: 1562334131927, monto: 1500, obrasocial: 'IOMA', estado: 'pendiente' },
         { id:'84343432aaa', fecha: 1561323931927, monto: 3400, obrasocial: 'OSDE', estado: 'pendiente' },
         { id:'94343432aaa', fecha: 1560313131927, monto: 3900, obrasocial: 'OSDE', estado: 'pendiente' },
      ]
      return arr
   }
   private getFacturasCobradasMock() {
      const arr = [
         { id:'31343432aaa', fecha: 1563374831927, monto: 1100, obrasocial: 'OSDE', estado: 'cobrada' },
         { id:'32343432aaa', fecha: 1563374621927, monto: 1500, obrasocial: 'OSDE', estado: 'cobrada' },
         { id:'33343432aaa', fecha: 1563373831927, monto: 900, obrasocial: 'IOMA', estado: 'cobrada' },
         { id:'34343432aaa', fecha: 1562372831927, monto: 800, obrasocial: 'Swiss', estado: 'cobrada' },
         { id:'35343432aaa', fecha: 1560371831927, monto: 5400, obrasocial: 'Swiss', estado: 'cobrada' },
      ]
      return arr
   }
}
