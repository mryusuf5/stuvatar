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
          title
          image_url
        }
      }
    }
  }
}
`;

const getInventory = gql`
query MyQuery($studentId: Int!) {
  item_inventories(student_id: $studentId) {
    data {
      item_id
    }
  }
}
`;

const getItem = gql`
query MyQuery($itemId: Int!) {
  item(id: $itemId) {
    image_url
    title
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
  public inventory: Inventory[];
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

  public getInventoryItems(inventory: any)
  {
    this.inventory = [];
    inventory.item_inventories.data.forEach((e) => {
      this.querySubscription = this.apollo
        .watchQuery<any>({
          query: getItem,
          variables: {
            itemId: parseInt(String(e.item_id))
          }
        })
        .valueChanges.subscribe(({ data, loading }) => {
          this.inventory.push(data);
          console.log(this.inventory)
        });
    })
  }
}
