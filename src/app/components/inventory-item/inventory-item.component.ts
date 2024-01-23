import {Component, Input} from '@angular/core';
import {ScreenService} from "../../services/screen.service";
import {gql, Apollo} from "apollo-angular";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";


const activateItem = gql`
mutation MyMutation($id: Int!) {
  updateItemStudent(id: $id) {
    item_id
    is_active
  }
}
`;

@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styleUrls: ['./inventory-item.component.scss']
})
export class InventoryItemComponent {
  @Input() image_url: string;
  @Input() item_id: number;
  @Input() is_chest: number;
  @Input() used: boolean = false;
  @Input() chest_id: number;

  constructor(private screenService: ScreenService,
              private apollo: Apollo,
              private toast: ToastrService) {
  }

  private querySubscription: Subscription;

  public wearItem(e)
  {
    this.querySubscription = this.apollo
      .mutate({
        mutation: activateItem,
        variables: {
          id: Number(e.target.id),
        }
      })
      .subscribe({
        next: ({ data }) => {
          this.toast.success("Item equiped", "Succes", {
            positionClass: "toast-center-center",
            timeOut: 5000
          })
          setTimeout(() => {
            window.localStorage.removeItem("character");
            window.location.reload();
          }, 2000)
        },
        error: (error) => {
          this.toast.error(error, "Error", {
            positionClass: "toast-center-center",
            timeOut: 5000
          })
        }
      });
  }



  public openChest(e)
  {
    this.screenService.changeChestId(e.target.id);
    this.screenService.changeMainChestId(this.chest_id);
    this.screenService.toggleClass();
  }
}
