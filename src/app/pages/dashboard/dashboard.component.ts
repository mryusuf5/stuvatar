import {Component, OnInit} from '@angular/core';
import { NgxSpinnerService} from "ngx-spinner";
import {GradesService} from "../../services/grades.service";
import {Subscription} from "rxjs";
import { Apollo, gql } from "apollo-angular";
import {Student} from "../../models/student";
import {Classmate} from "../../models/classmate";
import {Categories} from "../../models/categories";
import {ActivatedRoute} from "@angular/router";
import {Inventory} from "../../models/inventory";
import {Chest} from "../../models/chest";

const getStudents = gql`
  query MyQuery {
    students(grade_id: 1) {
      data {
        id
        last_name
        first_name
      }
    }
  }
`;

const getCategories = gql`
query MyQuery {
  categories {
    data {
      name
      items {
        data {
          id
          is_available_for_sale
          price
          image_url
          title
        }
      }
    }
  }
}
`;

const getInventory = gql`
query MyQuery($studentId: Int!) {
  item_inventories(student_id: $studentId, per_page: 500) {
    data {
      item_id
      id
    }
  }
}
`;

const getItem = gql`
query MyQuery($itemId: Int!) {
  item(id: $itemId) {
    image_url
    title
    id
  }
}
`;

const activeItems = gql`
query MyQuery($studentId: Int!) {
  active_item_inventory(student_id: $studentId) {
    image_url
    title
  }
}
`;

const getChests = gql`
query MyQuery {
  chests {
    data {
      image_url
      id
      price
      is_available_for_sale
    }
  }
}
`;

const getChestInventory = gql`
query MyQuery($studentId: Int!) {
  chest_inventories(student_id: $studentId) {
    data {
      chest_image
      id
      used
    }
  }
}
`;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  private querySubscription: Subscription;
  public hasChest: boolean = false;
  public student: Student;
  public classMates: Classmate[];
  public categories: Categories[];
  public inventory: any[];
  public image_url: string;
  public chests: any[];
  public chestInventory: any[];
  public studentId: number;
  public itemId: number;

  constructor(private spinner: NgxSpinnerService,
              private gradesService: GradesService,
              private apollo: Apollo,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    })

    const getStudent = gql`
  query MyQuery($studentId: Int!) {
    student(id: $studentId) {
      first_name
      grade_id
      id
      last_name
      points
    }
  }
`;

    this.studentId = this.activatedRoute.snapshot.params["id"];

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: activeItems,
        variables: {
          studentId: parseInt(String(this.studentId))
        }
      })
      .valueChanges.subscribe({
        next: ({ data }) => {
          this.image_url = data.active_item_inventory.image_url
          window.localStorage.setItem("character", this.image_url);
        },
        error: (error) => {
        }
      });

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: getChestInventory,
        variables: {
          studentId: parseInt(String(this.studentId))
        }
      })
      .valueChanges.subscribe({
        next: ({ data }) => {
          this.chestInventory = data.chest_inventories.data;
        },
        error: (error) => {
        }
      });

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: getStudent,
        variables: {
          studentId: parseInt(String(this.studentId))
        }
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.student = data.student;
      });

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: getChests,
        variables: {
          studentId: parseInt(String(this.studentId))
        }
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.chests = data.chests.data;
      });

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: getStudents,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.classMates = data.students.data;
      });

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: getCategories,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.categories = data.categories.data
      });

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: getInventory,
        variables: {
          studentId: parseInt(String(this.studentId))
        }
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.inventory = data;
        this.getInventoryItems(this.inventory);
      });
  }

  public getInventoryItems(inventory: any) {
    // Resetting and initializing the inventory array with placeholders
    this.inventory = new Array(inventory.item_inventories.data.length).fill(null);

    inventory.item_inventories.data.forEach((e, index) => {
      // Store the id at the correct index
      this.inventory[index] = { id: e.id };

      this.querySubscription = this.apollo
        .watchQuery<any>({
          query: getItem,
          variables: {
            itemId: parseInt(String(e.item_id))
          }
        })
        .valueChanges.subscribe(({ data, loading }) => {
          // Update the data at the correct index
          this.inventory[index] = { ...this.inventory[index], data: data.item };
        });
    });
  }
}
