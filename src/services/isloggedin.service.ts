import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsloggedinService {
  private booleanSource  = new BehaviorSubject<boolean>(false);
  currentData = this.booleanSource.asObservable();
  dataChanged: EventEmitter<boolean> = new EventEmitter();
  isLogged: boolean =false;
  private isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  changeData(value: boolean) {
    this.booleanSource.next(value);
    this.dataChanged.emit(value);
  }

  setIsLoggedIn(status: boolean): void {
    this.isLoggedSubject.next(status);
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  get currentStatus(): boolean {
    return this.isLoggedSubject.value;
  }

}