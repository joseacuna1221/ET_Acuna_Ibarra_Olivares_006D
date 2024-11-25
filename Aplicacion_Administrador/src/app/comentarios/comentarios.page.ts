import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-comentarios',
    templateUrl: './comentarios.page.html',
    styleUrls: ['./comentarios.page.scss'],
    standalone: false
})
export class ComentariosPage implements OnInit {

  evento:any;
  constructor(private activated:ActivatedRoute) { 
    this.activated.queryParams.subscribe(param => {
      this.evento = JSON.parse(param['evento'])
      console.log(this.evento)
    })
   }

  ngOnInit() {
  }

}
