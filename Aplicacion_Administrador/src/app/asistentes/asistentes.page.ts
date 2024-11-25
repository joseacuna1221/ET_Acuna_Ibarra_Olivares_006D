import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-asistentes',
    templateUrl: './asistentes.page.html',
    styleUrls: ['./asistentes.page.scss'],
    standalone: false
})
export class AsistentesPage implements OnInit {

  evento:any;

  constructor(private activated:ActivatedRoute) {
    this.activated.queryParams.subscribe(param => {
      this.evento = JSON.parse(param['evento'])
      console.log(this.evento)
    });
   }

  ngOnInit() {
  }

}
