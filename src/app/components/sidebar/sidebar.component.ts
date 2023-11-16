import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() lockScreen = new EventEmitter<void>();

  public status: boolean = false;

  public openMenu()
  {
    this.status = !this.status;
  }

  public onScreenLock()
  {
    this.lockScreen.emit();
  }
}
