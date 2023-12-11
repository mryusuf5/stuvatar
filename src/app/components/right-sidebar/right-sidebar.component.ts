import {Component, Input, OnInit} from '@angular/core';
import {Classmate} from "../../models/classmate";

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit{
  @Input() classMates: Classmate[];

  public ngOnInit() {

  }

  public openStudent(e)
  {

  }
}
