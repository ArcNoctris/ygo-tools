import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, FirebaseAuthenticationService } from '../../core/services';
import { User } from '@capacitor-firebase/authentication';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public currentUser: User | null = null;
  public idToken = '';
  public languageCode = '';
  public main = false
  constructor(
    private menu: MenuController,
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly dialogService: DialogService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {

  }
  route(site:string){
    this.router.navigate([site])
  }
  openFirst() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }


}
