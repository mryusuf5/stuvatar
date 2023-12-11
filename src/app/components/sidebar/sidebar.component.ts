import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Student} from "../../models/student";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() lockScreen = new EventEmitter<void>();
  @Input() Student: Student;

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
