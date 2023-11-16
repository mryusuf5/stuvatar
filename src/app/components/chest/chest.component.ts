import {Component, OnInit} from '@angular/core';
import {ScreenService} from "../../services/screen.service";

const rarityArray = [
  "common",
  "uncommon",
  "rare",
  "legendary"
];

const rarityTier = Math.floor(Math.random() * 100) + 1;

@Component({
  selector: 'app-chest',
  templateUrl: './chest.component.html',
  styleUrls: ['./chest.component.scss']
})
export class ChestComponent implements OnInit{
  public chest:HTMLImageElement = null;
  public background:HTMLImageElement = null;
  public openedChest: boolean = false;
  public closeButton: boolean = false;

  constructor(private screenService: ScreenService) {
  }


  ngOnInit(): void {
    this.chest = document.querySelector("#chest");
    this.background = document.querySelector("#background")

    this.screenService.addClass$.subscribe((e) => {
      this.openedChest = e;
    })
  }

  public openChest()
  {
    this.closeButton = true;
    let index;

    if (rarityTier <= 50) {
      index = 0;
    } else if (rarityTier <= 85) {
      index = 1;
    } else if (rarityTier <= 95) {
      index = 2;
    } else {
      index = 3;
    }
    console.log(rarityTier)
    this.background.src = "assets/img/background-" + rarityArray[index] + ".png";


    this.chest.classList.add("open-chest")
    this.background.classList.add("rotate-bg")

    setTimeout(() => {
      this.chest.src = "assets/img/knife.png"
      this.chest.classList.add("zoom")
    }, 3000)

    setTimeout(() => {
      window.location.reload();
    }, 5000)
  }

  public closeChest()
  {
    this.openedChest = false;
  }
}
