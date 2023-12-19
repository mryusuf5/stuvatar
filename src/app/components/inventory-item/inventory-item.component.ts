import {Component, Input} from '@angular/core';
import {ScreenService} from "../../services/screen.service";

@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styleUrls: ['./inventory-item.component.scss']
})
export class InventoryItemComponent {
  @Input() image_url: string;

  constructor(private screenService: ScreenService) {

  }

  public openChest()
  {
    this.screenService.toggleClass();
  }
}
