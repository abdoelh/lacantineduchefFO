import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../app/model/menu';
import { environment } from '../environements/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private host = environment.apiUrl;

  private apiUrl = this.host+'/api/plats'; // Replace with your Strapi API URL

  constructor(private http: HttpClient) { }

  getMenusByOrganization(orgId: number): Observable<any> {
    const url = `${this.apiUrl}?filters[organizations][id][$eq]=${orgId}&populate=*`;
    return this.http.get<any>(url);
  }
}
