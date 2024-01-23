import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private addClassSubject = new BehaviorSubject<boolean>(false);
  addClass$ = this.addClassSubject.asObservable();
  private chestIdSource = new BehaviorSubject<number>(0);
  currentChestId = this.chestIdSource.asObservable();
  private mainChestIdSource = new BehaviorSubject<number>(0);
  currentMainChestId = this.mainChestIdSource.asObservable();

  constructor() { }

  public toggleClass(){
    this.addClassSubject.next(true);
  }

  changeChestId(id: number) {
    this.chestIdSource.next(id);
  }

  changeMainChestId(id: number)
  {
    this.mainChestIdSource.next(id);
  }
}
