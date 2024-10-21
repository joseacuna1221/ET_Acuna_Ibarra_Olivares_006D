import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserauthService } from '../services/userauth.service';

@Injectable({
  providedIn: 'root'
})
export class AutorizadoGuard  {
  constructor(private authservice: UserauthService, 
    private toast: ToastController,
    private router: Router){
}

canActivate():

| Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
if (!this.authservice.IsLoggedIn()){
this.showToast('Debe iniciar sesión..');
this.router.navigateByUrl('/start');
return false;
}
else{
this.authservice.IsLoggedIn();
return true;    
}

}

async showToast(msg: any){
const toast = await this.toast.create({
message:msg,
duration: 3000
});
toast.present();
}

};
