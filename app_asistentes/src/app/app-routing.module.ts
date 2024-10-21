import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizadoGuard } from './guards/pp.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then(m => m.StartPageModule)
  },
  {
    path: 'contactanos',
    loadChildren: () => import('./contactanos/contactanos.module').then( m => m.ContactanosPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'inscrito',
    loadChildren: () => import('./inscrito/inscrito.module').then( m => m.InscritoPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'detalle-evento/:id',
    loadChildren: () => import('./detalle-evento/detalle-evento.module').then( m => m.DetalleEventoPageModule)
  },
  {
    path: 'miseventos',
    loadChildren: () => import('./miseventos/miseventos.module').then( m => m.MiseventosPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
