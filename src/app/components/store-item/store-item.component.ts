import {Component, Input, OnInit} from '@angular/core';
import {gql} from "apollo-angular";
import {Apollo} from "apollo-angular";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";

const buyItem = gql`
  mutation MyMutation($studentId: Int!, $itemId: Int!) {
    buyItem(student_id: $studentId, item_id: $itemId) {
      id
    }
  }
`;

const buyChest = gql`
mutation MyMutation($chestId: Int!, $studentId: Int!) {
  buyChest(chest_id: $chestId, student_id: $studentId) {
    chest_id
    used
  }
}
`;

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss']
})
export class StoreItemComponent implements OnInit{
  @Input() characterImage: string;
  @Input() characterTitle: string;
  @Input() characterPrice: number;
  @Input() isAvailable: boolean;
  @Input() itemId: number;
  @Input() isChest: boolean;
  private querySubscription: Subscription;
  public studentId: number;

  public constructor(private apollo: Apollo,
                     private activatedRoute: ActivatedRoute,
                     private toast: ToastrService) {
  }

  public buyItem() {
    this.querySubscription = this.apollo
      .mutate({
        mutation: buyItem,
        variables: {
          studentId: +this.studentId,
          itemId: +this.itemId
        }
      })
      .subscribe({
        next: ({ data }) => {
          this.toast.success("Item bought", "Succes", {
            positionClass: "toast-center-center",
            timeOut: 5000
          })
          setTimeout(() => {
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

  public buyChest() {
    this.querySubscription = this.apollo
      .mutate({
        mutation: buyChest,
        variables: {
          studentId: +this.studentId,
          chestId: Number(this.itemId)
        }
      })
      .subscribe({
        next: ({ data }) => {
          this.toast.success("Item bought", "Succes", {
            positionClass: "toast-center-center",
            timeOut: 5000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        },
        error: (error) => {
          this.toast.error(error, "Error", {
            positionClass: "toast-center-center",
            timeOut: 5000
          })
        }
      });
  }


  ngOnInit(): void {
    this.studentId = this.activatedRoute.snapshot.params["id"];
  }
}

