import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/core/guards/auth/auth.guard';
import {PlayComponent} from './play/play.component'
//import {LoginComponent} from './login/login.component'

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginPageModule),
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomePageModule),
   
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],

  },
  {
    path: 'decks',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'play',
    component: PlayComponent

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  //{
  //  path: '',
  //  loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  //}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

