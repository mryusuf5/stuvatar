import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit{
  public character: any = window.localStorage.getItem("character");

  ngOnInit(): void {
    setTimeout(() => {
      this.character = window.localStorage.getItem("character");
    }, 1000)

  }
}
