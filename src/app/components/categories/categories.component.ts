import { Component, Input } from '@angular/core';
import { Category } from '../../models/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  @Input() categories: Category[] = [];
  @Input() selectedCategory: string | null = null;

  selectCategory(categoryName: string) {
    this.selectedCategory = categoryName;
  }
}
