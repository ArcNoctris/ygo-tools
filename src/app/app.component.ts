import { Component } from '@angular/core';
import { FirebaseAuthenticationService } from './core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ygo-tools';
  constructor(
    private menu: MenuController,
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService
  ) {
    this.initializeApp();
  }
  private async initializeApp(): Promise<void> {
    await this.firebaseAuthenticationService.initialize();
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
