import { Injectable } from '@angular/core';
import { environment } from '../environements/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeballService {
  private host = environment.apiUrl;

  private apiUrl = this.host+'/api/pokeballs'; // Replace with your Strapi API URL

  constructor(private http: HttpClient) { }

  getPokeball(): Observable<any> {
    const url = `${this.apiUrl}?populate=*`;
    return this.http.get<any>(url);
  }}