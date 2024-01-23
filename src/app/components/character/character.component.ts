import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit{
  public character: any = window.localStorage.getItem("character");

  ngOnInit(): void {
    window.localStorage.removeItem("character");
    setTimeout(() => {
      if(window.localStorage.getItem("character"))
      {
        this.character = window.localStorage.getItem("character")
      }
      else
      {
        this.character ="https://api.dicebear.com/7.x/fun-emoji/svg?size=1024&seed=default-image&radius=50";
      }
    }, 1000)
  }
}
