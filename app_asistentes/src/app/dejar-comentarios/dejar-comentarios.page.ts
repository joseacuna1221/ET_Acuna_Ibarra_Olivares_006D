import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dejar-comentarios',
  templateUrl: './dejar-comentarios.page.html',
  styleUrls: ['./dejar-comentarios.page.scss'],
})
export class DejarComentariosPage implements OnInit {

  username = sessionStorage.getItem('username');
  evento:any;
  comentario:string ="";
  constructor(private activated:ActivatedRoute) { }

  ngOnInit() {
  }

}
