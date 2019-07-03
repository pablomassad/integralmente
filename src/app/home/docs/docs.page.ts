import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-docs',
   templateUrl: './docs.page.html',
   styleUrls: ['./docs.page.scss'],
})
export class DocsPage implements OnInit {

   constructor() {
      console.log('DocsPage constructor')
   }

   ngOnInit() {
   }

}
