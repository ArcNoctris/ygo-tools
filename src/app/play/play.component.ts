import { Component, OnInit } from '@angular/core';
import { User } from '@capacitor-firebase/authentication';
import { MenuController } from '@ionic/angular';
import { FirebaseCommunicationService } from '../services/firebase-communication.service';
interface PlayerOptions {
  value: string;
  viewValue: string;
}
interface Player {
  name: string;
  lp: number;
  cols: string;
  rows: string;
  class: string;
  background: Promise<string>;

}


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  isOpen = false;
  activePlayer: Player | null
  public players: Player[];
  public playerCount: string;
  public gameStarted: boolean;
  rowHeight: string;
  operator: string;
  value: number;
  updatedValue: number;
  menuVisible: boolean;

  public backgroundList: string[]

  constructor(
    public fcs: FirebaseCommunicationService,
    public menu: MenuController

  ) {
    this.players = []

    this.activePlayer = null

    this.backgroundList = []
    fcs.listBackgroundImages().then(
      list => {
        console.log(list)
        console.log(list.items.length)
        if (list.items.length != 0) {
          for (let item of list.items) {
            this.backgroundList.push(item.name)
          }
          this.resetGame()
        }


      }
    )


    this.playerCount = this.playerOptions[0].value
    this.gameStarted = false
    this.rowHeight = "2:1"

    this.operator = "-"
    this.value = 0
    this.updatedValue = 0
    this.menuVisible = false

  }
  openFirst() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }

  ngOnInit(): void {
  }
  updateResult() {
    if (this.activePlayer != null) {
      if (this.operator == "+") {
        this.updatedValue = this.activePlayer.lp + this.value
      }
      else if (this.operator == "-") {
        this.updatedValue = this.activePlayer.lp - this.value
      }
      else if (this.operator == "/") {
        this.updatedValue = this.activePlayer.lp / this.value
      }
      if (this.updatedValue < 0) {
        this.updatedValue = 0
      }
    }
  }

  playerOptions: PlayerOptions[] = [
    { value: '2', viewValue: 'Zwei' },
    { value: '3-1', viewValue: 'Drei [option 1] -|' },
    { value: '3-2', viewValue: 'Drei  [option 2] ||' },
    { value: '4-1', viewValue: 'Vier' },
    { value: '4-2', viewValue: 'Vier (2 vs. 2)' },
  ];
  startGame() {
    this.gameStarted = true
  }
  resetValue() {
    this.value = 0
    this.updateResult()
  }
  updateValue() {
    this.updateResult()
    this.closeCalc()
    let goal = this.updatedValue

    let lpCount = setInterval(() => {
      if (this.activePlayer != null) {
        let delta = Math.floor(Math.abs(this.activePlayer.lp - goal))
        if (this.activePlayer.lp == goal) {
          clearInterval(lpCount)
        }
        let toAdd = 0

        if (delta > 2500) {
          toAdd = 100
        }
        else if (delta > 250) {
          toAdd = 10
        }
        else {
          toAdd = 1
        }
        if (this.operator == "+") {
          this.activePlayer.lp += toAdd;
        } else {
          this.activePlayer.lp -= toAdd;
        }
      }

    }, 2)
    //this.activePlayer.lp = this.updatedValue

  }
  toValue(x: number, double = false) {
    if (this.value == 0) {
      this.value = x
    }
    else {
      if (double) {
        this.value = Number(String(this.value) + String(x) + String(x))
      } else {
        this.value = Number(String(this.value) + String(x))
      }
    }
    this.updateResult()
  }
  asOperator(x: string) {
    this.operator = x
    this.updateResult()
  }
  async getRandomBackground(playerClass: string): Promise<string> {
    let imgList = []
    imgList.push('01.png')
    imgList.push('02.jpg')
    imgList.push('03.jpg')
    imgList.push('04.jpg')
    imgList.push('05.jpg')
    imgList.push('06.jpg')
    imgList.push('07.jpg')
    console.log("this")
    console.log(this.backgroundList)
    //return this.backgroundList[Math.floor(Math.random() * imgList.length)]
    return await this.fcs.getBackgroundImageURL(playerClass, this.backgroundList[Math.floor(Math.random() * this.backgroundList.length)])
    //return imgList[Math.floor(Math.random() * imgList.length)]
  }

  calcPlayer(player: Player) {
    this.activePlayer = player
    this.updateResult()
    this.isOpen = !this.isOpen

  }
  closeCalc() {
    this.value = 0
    this.isOpen = false
  }
  animateNumbers() {

  }
  toggleMenu() {

    this.menuVisible = !this.menuVisible

  }
  resetGame() {
    this.players = []
    this.players.push({ name: "Plyer1", lp: 8000, cols: "1/7", rows: "1/1", class: "r180", background: this.getRandomBackground("r180") })
    this.activePlayer = this.players[0]
    this.players.push({ name: "Plyer2", lp: 8000, cols: "1/7", rows: "2/2", class: "normal", background: this.getRandomBackground("normal") })
    switch (this.playerCount) {
      case '2': {
        this.rowHeight = "2:1"
        break;
      }
      case '3-1': {
        this.rowHeight = "1:1"
        this.players[0].cols = "1/3"
        this.players[1].cols = "3/7"
        this.players[0].rows = "1/3"
        this.players[1].rows = "1/1"
        this.players[0].class = "r90"
        this.players[1].class = "r180"
        this.players.push({ name: "Plyer3", lp: 8000, cols: "3/7", rows: "2/2", class: "normal", background: this.getRandomBackground("normal") })
        break;
      }
      case '3-2': {
        this.rowHeight = "1:1"
        this.players[0].cols = "1/4"
        this.players[1].cols = "4/7"
        this.players[0].rows = "1/1"
        this.players[1].rows = "1/1"
        this.players[1].class = "r180"
        this.players.push({ name: "Plyer3", lp: 8000, cols: "1/4", rows: "2/2", class: "normal", background: this.getRandomBackground("normal") })

        break;
      }
      case '4-1': {
        this.rowHeight = "1:1"
        this.players[0].cols = "1/4"
        this.players[1].cols = "4/7"
        this.players[0].rows = "1/1"
        this.players[1].rows = "1/1"
        this.players[1].class = "r180"
        this.players.push({ name: "Plyer3", lp: 8000, cols: "1/4", rows: "2/2", class: "normal", background: this.getRandomBackground("normal") })
        this.players.push({ name: "Plyer3", lp: 8000, cols: "4/7", rows: "2/2", class: "normal", background: this.getRandomBackground("normal") })
        break;
      }
      case '4-2': {
        this.rowHeight = "1:1"
        this.players[0].name = 'Team1'
        this.players[1].name = 'Team2'
        this.players[0].lp = 16000
        this.players[1].lp = 16000
        break;
      }
    }
    console.log("this")
    console.log(this.players[0].background)
  }

}
