import {Component, Input, OnInit} from '@angular/core';
import {gql} from "apollo-angular";
import {Apollo} from "apollo-angular";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

const buyItem = gql`
  mutation MyMutation($studentId: Int!, $itemId: Int!) {
    buyItem(student_id: $studentId, item_id: $itemId) {
      id
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
  private querySubscription: Subscription;
  public studentId: number;

  public constructor(private apollo: Apollo,
                     private activatedRoute: ActivatedRoute) {
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
          alert("Item succesfully bought")
          window.location.reload();
        },
        error: (error) => {
          alert("Item already owned");
        }
      });
  }



  ngOnInit(): void {
    this.studentId = this.activatedRoute.snapshot.params["id"];
  }
}

