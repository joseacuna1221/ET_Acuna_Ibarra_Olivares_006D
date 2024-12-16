import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizadoGuard } from './guards/autorizados.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full' 
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'fpassword',
    loadChildren: () => import('./fpassword/fpassword.module').then( m => m.FpasswordPageModule)
  },
  {
    path: 'eventregister',
    loadChildren: () => import('./eventregister/eventregister.module').then( m => m.EventregisterPageModule),
    canActivate:[AutorizadoGuard]
  },
  {
    path: 'qr',
    loadChildren: () => import('./qr/qr.module').then( m => m.QrPageModule),
    canActivate:[AutorizadoGuard]
  },
  {
    path: 'detalle-evento',
    loadChildren: () => import('./detalle-evento/detalle-evento.module').then( m => m.DetalleEventoPageModule),
    canActivate:[AutorizadoGuard]
  },
  {
    path: 'comentarios',
    loadChildren: () => import('./comentarios/comentarios.module').then( m => m.ComentariosPageModule),
    canActivate:[AutorizadoGuard]
  },
  {
    path: 'dejar-comentarios',
    loadChildren: () => import('./dejar-comentarios/dejar-comentarios.module').then( m => m.DejarComentariosPageModule),
    canActivate:[AutorizadoGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
