import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss']
})
export class StoreItemComponent {
  @Input() characterImage: string;
  @Input() characterTitle: string;
}
