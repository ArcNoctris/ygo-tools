import { Component, OnInit } from '@angular/core';
import { User } from '@capacitor-firebase/authentication';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  openFirst() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }
  constructor(
    private menu: MenuController,

  ) {}

  ngOnInit(): void {
  }

}
