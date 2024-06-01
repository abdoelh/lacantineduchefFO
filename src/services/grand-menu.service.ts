import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environements/environment';

@Injectable({
  providedIn: 'root'
})
export class GrandMenuService {
  private host = environment.apiUrl;

  private apiUrl = this.host+'/api/grand-menus'; // Replace with your Strapi API URL

  constructor(private http: HttpClient) { }

  getGrandMenu(): Observable<any> {
    const url = `${this.apiUrl}?populate=*`;
    return this.http.get<any>(url);
  }}
