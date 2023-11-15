import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private addClassSubject = new BehaviorSubject<boolean>(false);
  addClass$ = this.addClassSubject.asObservable();
  constructor() { }

  public toggleClass(){
    this.addClassSubject.next(true);
  }
}
