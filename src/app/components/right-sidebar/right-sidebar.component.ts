import { Component } from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent {
  public pupils: any = [
    {name: "Yusuf Yildiz", image: "character1.png", id: 1},
    {name: "Kaan Secen", image: "character2.png", id: 2},
    {name: "Tommie Ruhl", image: "character3.png", id: 3},
    {name: "Bram Platier", image: "character4.png", id: 4},
    {name: "Casper Smets", image: "character5.png", id: 5},
    {name: "Senna szlanina", image: "character6.png", id: 6},
    {name: "Tom Brady", image: "character7.png", id: 7},
    {name: "Mark Rutten", image: "character8.png", id: 8},
    {name: "Geert Wilders", image: "character9.png", id: 9},
    {name: "Thierry Baudet", image: "character10.png", id: 10},
    {name: "Pieter Post", image: "character11.png", id: 11},
    {name: "Donald Trump", image: "character12.png", id: 12},
    {name: "Joe Biden", image: "character13.png", id: 13}
  ];

  public openStudent(e)
  {
    setTimeout(() => {
      const student = document.querySelector("#student" + e.target.id);
      console.log(student)
      student.classList.add("d-block", "show")
      student.classList.remove("d-none");
    })
  }
}
