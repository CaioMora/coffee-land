import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/category';
import { sharedImports } from '../../services/shared/shared-imports';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  @Input() categories: Category[] | null = [];
  @Input() selectedCategory: string | null = null;
  @Output() categorySelected = new EventEmitter<string>();

  onSelectCategory(categoryName: string) {
    this.categorySelected.emit(categoryName);
  } 

  onClearCategory() {
    this.categorySelected.emit(undefined);
  } 

}
