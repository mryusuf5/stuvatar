import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public status: boolean = false;

  public openMenu()
  {
    this.status = !this.status;
  }
}
