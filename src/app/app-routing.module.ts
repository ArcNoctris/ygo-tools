import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/core/guards/auth/auth.guard';
import {PlayComponent} from './play/play.component'
import {DeckComponent} from './deck/deck.component'
import {LoginComponent} from './login/login.component'
import {HomeComponent} from './home/home.component'
import {ProfileComponent} from './profile/profile.component'

//import {LoginComponent} from './login/login.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'decks',
    component: DeckComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'play',
    component: PlayComponent,
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

