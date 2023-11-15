import { Component } from '@angular/core';
import {ScreenService} from "../../services/screen.service";

@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styleUrls: ['./inventory-item.component.scss']
})
export class InventoryItemComponent {
  constructor(private screenService: ScreenService) {

  }

  public openChest()
  {
    this.screenService.toggleClass();
  }
}
