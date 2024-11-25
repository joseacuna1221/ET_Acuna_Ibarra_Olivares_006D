import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { ApicrudService } from '../services/apicrud.service';
import { IEventos } from 'src/interfaces/IEventos';
import { Router ,ActivatedRoute} from '@angular/router';
import Swiper from 'swiper';
// import 'swiper/css';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})



export class Tab2Page implements OnInit{
  @ViewChild('swiper') 
  swiperRef: ElementRef | undefined;;
  swiper?:Swiper;
  segmentList: Array<string> = ['assets/robots.jpg', 'assets/evento1.jpg', 'assets/arbol1.jpg'];
  selectedSegment: string = this.segmentList[0];

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    loop:true,
    autoplay:{
      delay:4000
    }
  };

  

  eventos: IEventos[]=[];
  evento: any;

  constructor(private menucontroller: MenuController, private apicrud: ApicrudService, private router:Router,
    private activated: ActivatedRoute, private alert: AlertController) {
      this.activated.queryParams.subscribe(param =>{
        if (param['evento']) {
          try {
            this.evento = JSON.parse(param['evento']);  // Intentar parsear el evento
          } catch (e) {
            console.error('Error al parsear JSON: ', e);
          }
        }
      })
    }

    ngOnInit() {
      this.apicrud.getEventos().subscribe(data=>{
        this.eventos=data;
      })
    }
  
    asistirEvento(Observable:any){
      this.router.navigate(['/eventregister'],
        {queryParams:{evento: JSON.stringify(Observable)}})
    }

    masInformacion(Observable:any){
      this.router.navigate(['/detalle-evento'],
        {queryParams:{evento: JSON.stringify(Observable)}})
    }

    swiperReady() {
      this.swiper = this.swiperRef?.nativeElement.swiper;
    }
  
    swiperSlideChanged(e: any) {
      const index = e.target.swiper.activeIndex
      this.selectedSegment = this.segmentList[index]
    }
  
    _segmentSelected(index: number) {
      this.swiper?.slideTo(index)
    }
}
