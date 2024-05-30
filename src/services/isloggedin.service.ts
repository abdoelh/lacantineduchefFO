import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsloggedinService {
  private booleanSource  = new BehaviorSubject<boolean>(false);
  currentData = this.booleanSource.asObservable();
  dataChanged: EventEmitter<boolean> = new EventEmitter();

  changeData(value: boolean) {
    this.booleanSource.next(value);
    this.dataChanged.emit(value);
  }
}