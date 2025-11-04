import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coffee } from '../models/coffees';
import { Banner } from '../models/banners';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category';
import { Coupon } from '../models/coupon';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  private readonly API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCoffees(): Observable<Coffee[]> {
    return this.http.get<Coffee[]>(`${this.API}/coffees`);
  }

  getBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(`${this.API}/banners`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.API}/categories`);
  }

  getCoupons() {
   return this.http.get<Coupon[]>(`${this.API}/coupons`);;
 }

}
