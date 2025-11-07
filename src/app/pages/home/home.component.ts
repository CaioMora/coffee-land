import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe, NgForOf } from '@angular/common';
import { BannerComponent } from '../../components/banner/banner.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { CoffeeViewModel } from '../../viewModels/coffee-viewmodel';
import { sharedImports } from '../../services/shared/shared-imports';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    sharedImports,
    AsyncPipe,
    NgForOf,
    BannerComponent,
    CategoriesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  coffees$ = this.vm.filteredCoffees$;
  banners$ = this.vm.banners$;
  categories$ = this.vm.categories$;
  selectedCategory$ = this.vm.selectedCategory$; // mantém estado reativo centralizado

  constructor(private vm: CoffeeViewModel, private router: Router) {}

  ngOnInit(): void {
    this.vm.loadData();
  }

  goToDetail(id: number): void {
    this.router.navigate(['/detail-item', id]);
  }

  onCategorySelected(category: string | null) {
    this.vm.setSelectedCategory(category);
  }
}
