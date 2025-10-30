import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coffee } from '../models/coffees';
import { Banner } from '../models/banners';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  private readonly API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCoffees(): Observable<Coffee[]> {
    return this.http.get<Coffee[]>(`${this.API}/coffees`);
  }

  getPromoBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(`${this.API}/banners`)
  }
}
