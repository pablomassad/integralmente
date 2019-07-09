import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'fwk4-services';
import { Router } from '@angular/router'
import * as moment from 'moment'
import { ActionSheetController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
   selector: 'app-pacientes',
   templateUrl: './pacientes.page.html',
   styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {

   userPhoto: any

   patients: any = []

   constructor(
      private actionSheetController: ActionSheetController,
      private router:Router,
      private afs: AngularFirestore,
      private globalSrv: GlobalService
   ) {
      console.log('PacientesPage constructor')
      this.userPhoto = "assets/users/pato.jpg" //"assets/images/anonymous.png"
   }

   async ngOnInit() {
      this.afs.collection('pacientes').valueChanges().subscribe(ps=>{
         this.patients = ps // this.getPatientsByProfessional(1)
      }) 
   }
   removePatient(p){
      this.afs.collection('pacientes').doc(p.id).delete()
   }
   async openMenuSheet() {
      const actionSheet = await this.actionSheetController.create({
         header: 'Opciones',
         buttons: [
            {
               text: 'Salir',
               icon: 'log-out',
               handler: () => {
                  console.log('Logout');
               }
            }, {
               text: 'Cancelar',
               icon: 'close',
               role: 'cancel',
               handler: () => {
                  console.log('Cancelar');
               }
            }]
      });
      await actionSheet.present();
   }

   async gotoPatient(p){
      await this.globalSrv.setItem('patient', p)
      this.router.navigate(["/menu/home/ficha"])
   }

   evalEdad(nac){
      const today = moment()
      const cumple = moment(nac)
      const edad = today.diff(cumple, 'y')
      return edad + " años"
   }
   private getPatientsByProfessional(id) {
      const arr = [
         {
            nombres: 'Miguel Nicolas',
            apellido: 'Aguirre',
            dni:50045987,
            edad: moment().diff(moment(1562096997361, 'y')),
            nacimiento: 1512205596527,
            domicilio: "Guido 188",
            ciudad: "Acevedo, Pergamino",
            colegio: "Santa Julia",
            curso:"4to grado",
            atencion:"lunes y jueves 17 a 17:45hs",
            obrasocial:"OSDE",
            afiliado:"124555543434",
            diagnostico:"Dislexia",
            padre:"Pedro Luis Cevallos",
            telpadre: "02477506444",
            madre:"Natalia Sara Gutierres",
            telmadre: "02477506455",
            email: "saralopez@gmail.com",
            foto:"assets/users/boy1.jpg",
            historia:[
               {
                  fecha:1562578136108,
                  observaciones: "Se observa un progreso notorio en la motricidad manual y mecanica a lo largo de toda la sesion. Es prudente el seguimiento paso a paso y dia por dia de la evolucion, y avisar cualquier cambio.",
                  notas:"Pedir certificados de sanidad",
                  adjuntos:[]
               },
               {
                  fecha:1562578136108,
                  observaciones: "Se observa un progreso notorio en la motricidad manual y mecanica a lo largo de toda la sesion. Es prudente el seguimiento paso a paso y dia por dia de la evolucion, y avisar cualquier cambio.",
                  notas:"Pedir certificados de sanidad",
                  adjuntos:[]
               },
               {
                  fecha:1562598136108,
                  observaciones: "Se observa un progreso notorio en la motricidad manual y mecanica a lo largo de toda la sesion. Es prudente el seguimiento paso a paso y dia por dia de la evolucion, y avisar cualquier cambio.",
                  notas:"Pedir certificados de sanidad",
                  adjuntos:[]
               }
            ]
         },
         {
            nombres: 'Angel Brian',
            apellido: 'Villegas',
            dni:48987221,
            edad: '',
            nacimiento: 1412205596527,
            colegio: "Normal 16",
            domicilio: "Dr.Alem 2100",
            ciudad: "Pergamino",
            curso:"3er grado",
            atencion:"lunes y jueves 17 a 17:45hs",
            obrasocial:"IOMA",
            afiliado:"34352222200",
            diagnostico:"TGD",
            padre:"Pedro Luis Cevallos",
            telpadre: "02477506444",
            madre:"Natalia Sara Gutierres",
            telmadre: "02477506455",
            email: "natyperez@hotmail.com",
            foto:"assets/users/boy2.jpg",
            historia:[
               {
                  fecha:1562578136108,
                  observaciones: "Se observa un progreso notorio en la motricidad manual y mecanica a lo largo de toda la sesion. Es prudente el seguimiento paso a paso y dia por dia de la evolucion, y avisar cualquier cambio.",
                  notas:"Pedir certificados de sanidad",
                  adjuntos:[]
               },
               {
                  fecha:1562578136108,
                  observaciones: "Se observa un progreso notorio en la motricidad manual y mecanica a lo largo de toda la sesion. Es prudente el seguimiento paso a paso y dia por dia de la evolucion, y avisar cualquier cambio.",
                  notas:"Pedir certificados de sanidad",
                  adjuntos:[]
               },
               {
                  fecha:1562598136108,
                  observaciones: "Se observa un progreso notorio en la motricidad manual y mecanica a lo largo de toda la sesion. Es prudente el seguimiento paso a paso y dia por dia de la evolucion, y avisar cualquier cambio.",
                  notas:"Pedir certificados de sanidad",
                  adjuntos:[]
               }
            ]
         },
         {
            nombres: 'Lautaro',
            apellido: 'Gomez',
            dni:49045958,
            edad: '',
            nacimiento: 1312205596527,
            colegio: "Marista",
            domicilio: "Ameguino 254 P3A",
            ciudad: "Pergamino",
            curso:"5to grado",
            atencion:"martes 15 a 15:45hs",
            obrasocial:"IOMA",
            afiliado:"34352222200",
            diagnostico:"TEA",
            padre:"Pedro Luis Cevallos",
            telpadre: "02477506444",
            madre:"Natalia Sara Gutierres",
            telmadre: "02477506455",
            email: "oficina11@gmail.com",
            foto:"assets/users/boy3.jpg",
            historia:[
               {
                  fecha:1562578136108,
                  observaciones: "Se observa un progreso notorio en la motricidad manual y mecanica a lo largo de toda la sesion. Es prudente el seguimiento paso a paso y dia por dia de la evolucion, y avisar cualquier cambio.",
                  notas:"Pedir certificados de sanidad",
                  adjuntos:[]
               },
               {
                  fecha:1562578136108,
                  observaciones: "Se observa un progreso notorio en la motricidad manual y mecanica a lo largo de toda la sesion. Es prudente el seguimiento paso a paso y dia por dia de la evolucion, y avisar cualquier cambio.",
                  notas:"Pedir certificados de sanidad",
                  adjuntos:[]
               },
               {
                  fecha:1562598136108,
                  observaciones: "Se observa un progreso notorio en la motricidad manual y mecanica a lo largo de toda la sesion. Es prudente el seguimiento paso a paso y dia por dia de la evolucion, y avisar cualquier cambio.",
                  notas:"Pedir certificados de sanidad",
                  adjuntos:[]
               }
            ]
         },
         {
            nombres: 'Sara Luciana',
            apellido: 'Dominguez',
            dni:51045554,
            edad: '',
            nacimiento: 1112205596527,
            colegio: "Santa Julia",
            domicilio: "Posadas 334",
            ciudad: "Pergamino",
            curso:"5to grado",
            atencion:"miercoles y viernes 16 a 16:45hs",
            obrasocial:"SWISS MED",
            afiliado:"34352222200",
            diagnostico:"Dislexia",
            padre:"Martin Nicolas Pepon",
            telpadre: "02477506000",
            madre:"Marta Mariza Reyna",
            telmadre: "02477523642",
            email: "martita@gmail.com",
            foto:"assets/users/girl.jpg",
            historia:[
               {
                  fecha:1562578136108,
                  observaciones: "Se observa un progreso notorio en la motricidad manual y mecanica a lo largo de toda la sesion. Es prudente el seguimiento paso a paso y dia por dia de la evolucion, y avisar cualquier cambio.",
                  notas:"Pedir certificados de sanidad",
                  adjuntos:[]
               },
               {
                  fecha:1562578136108,
                  observaciones: "Se observa un progreso notorio en la motricidad manual y mecanica a lo largo de toda la sesion. Es prudente el seguimiento paso a paso y dia por dia de la evolucion, y avisar cualquier cambio.",
                  notas:"Pedir certificados de sanidad",
                  adjuntos:[]
               },
               {
                  fecha:1562598136108,
                  observaciones: "Se observa un progreso notorio en la motricidad manual y mecanica a lo largo de toda la sesion. Es prudente el seguimiento paso a paso y dia por dia de la evolucion, y avisar cualquier cambio.",
                  notas:"Pedir certificados de sanidad",
                  adjuntos:[]
               }
            ]
         },                           
      ]
      return arr
   }

}
