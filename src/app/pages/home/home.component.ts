import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { CoffeeService } from '../../services/coffee.service';
import { sharedImports } from '../../services/shared/shared-imports';
import { AsyncPipe, NgForOf } from '@angular/common';
import { CoffeeViewModel } from '../../viewModels/coffee-viewmodel';
import { Router } from '@angular/router';
import { CategoriesComponent } from '../../components/categories/categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    sharedImports,
    AsyncPipe, 
    NgForOf, 
    BannerComponent,
    CategoriesComponent],
  providers: [CoffeeService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  coffees$ = this.vm.filteredCoffees$;
  banners$ = this.vm.banners$;
  categories$ = this.vm.categories$;
  selectedCategory$ = this.vm.selectedCategory$;

  constructor(private vm: CoffeeViewModel, private router: Router) {}

  ngOnInit(): void {
    this.vm.loadData();
  }

  onCategorySelected(category: string | null) {
    this.vm.setSelectedCategory(category)
  }

  goToDetail(id: number) {
    this.router.navigate(['/detail-item', id]);
  }

}
