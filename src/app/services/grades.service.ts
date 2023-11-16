import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {gql} from "apollo-angular";

@Injectable({
  providedIn: 'root'
})
export class GradesService {

  constructor(private http: HttpClient) { }

  public test()
  {
    const query = gql`
  query test {
    grades {
    data{
      color
      description
      grade_number
    }
    }
  }
`;


    const body:any = {
      query: query
    }

    return this.http.get("https://admin.stuvatar.nl/graphql", body);
  }
}
