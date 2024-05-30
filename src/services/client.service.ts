import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../app/model/client';
import { environment } from '../environements/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private host = environment.apiUrl;

  private apiUrl = this.host+'/api/clients';

  constructor(private http: HttpClient) { }

  getClients(): Observable<any> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClient(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}?populate=organization`;
    return this.http.get<Client>(url);
  }
}
