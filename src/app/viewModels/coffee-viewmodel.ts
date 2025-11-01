import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, tap } from 'rxjs';
import { CoffeeService } from '../services/coffee.service';
import { Coffee } from '../models/coffees';
import { Banner } from '../models/banners';
import { Category } from '../models/category';

@Injectable({ providedIn: 'root' })
export class CoffeeViewModel {
  private coffeesSubject = new BehaviorSubject<Coffee[] | null>(null);
  private bannersSubject = new BehaviorSubject<Banner[] | null>(null);
  private categoriesSubject = new BehaviorSubject<Category[] | null>(null);

  coffees$ = this.coffeesSubject.asObservable();
  banners$ = this.bannersSubject.asObservable();
  categories$ = this.categoriesSubject.asObservable();

  private loaded = false;

  constructor(private coffeeService: CoffeeService) {}

  loadData(): void {
    if (this.loaded) return;

    combineLatest([
      this.coffeeService.getCoffees(),
      this.coffeeService.getBanners(),
      this.coffeeService.getCategories()
    ])
      .pipe(
        tap(([coffees, banners, categories]) => {
          this.coffeesSubject.next(coffees);
          this.bannersSubject.next(banners);
          this.categoriesSubject.next(categories);
          this.loaded = true;
        })
      )
      .subscribe();
  }
}
