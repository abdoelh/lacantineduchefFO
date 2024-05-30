import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private dataSubject = new BehaviorSubject<any>(null);
  currentData = this.dataSubject.asObservable();

  constructor() {
    const savedData = localStorage.getItem('clientData');
    if (savedData) {
      this.dataSubject.next(JSON.parse(savedData));
    }
  }

  changeData(value: any) {
    localStorage.setItem('clientData', JSON.stringify(value));
    this.dataSubject.next(value);
  }

  clearData() {
    localStorage.removeItem('clientData');
    this.dataSubject.next(null);
  }
}
