import {Component, OnInit} from '@angular/core';
import { NgxSpinnerService} from "ngx-spinner";
import {GradesService} from "../../services/grades.service";
import {Subscription} from "rxjs";
import { Apollo, gql } from "apollo-angular";

const query = gql`
  query test {
    grades {
    data{
       color
      description
      grade_number
      title
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

  constructor(private spinner: NgxSpinnerService,
              private gradesService: GradesService,
              private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000)

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: query,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(data);
      });
  }

  public test()
  {
    this.gradesService.test().subscribe((e) => {
      console.log(e);
    });
  }


}
