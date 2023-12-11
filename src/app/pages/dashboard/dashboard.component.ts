import {Component, OnInit} from '@angular/core';
import { NgxSpinnerService} from "ngx-spinner";
import {GradesService} from "../../services/grades.service";
import {Subscription} from "rxjs";
import { Apollo, gql } from "apollo-angular";
import {Student} from "../../models/student";
import {Classmate} from "../../models/classmate";
import {Categories} from "../../models/categories";

const query = gql`
  query MyQuery {
    student(id: 10) {
      first_name
      grade_id
      id
      last_name
      points
    }
  }
`;

const query2 = gql`
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

const query3 = gql`
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

  constructor(private spinner: NgxSpinnerService,
              private gradesService: GradesService,
              private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    })

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: query,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.student = data.student;
      });

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: query2,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.classMates = data.students.data;
      });

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: query3,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.categories = data.categories.data
        console.log(this.categories);
      });
  }


}
