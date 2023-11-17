import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-idle',
  templateUrl: './idle.component.html',
  styleUrls: ['./idle.component.scss']
})
export class IdleComponent implements OnInit{
  constructor(private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
  }
}
