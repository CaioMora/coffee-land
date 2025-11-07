import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { Category } from '../../models/category';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategoriesComponent]
    });

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir categorySelected com o nome da categoria ao selecionar', () => {
    spyOn(component.categorySelected, 'emit');
    component.onSelectCategory('Arábica');
    expect(component.categorySelected.emit).toHaveBeenCalledWith('Arábica');
  });

  it('deve emitir categorySelected sem valor ao limpar a seleção', () => {
    spyOn(component.categorySelected, 'emit');
    component.onClearCategory();
    expect(component.categorySelected.emit).toHaveBeenCalledWith(undefined);
  });

  it('deve aceitar categorias via @Input', () => {
    const mockCategories: Category[] = [
      { name: 'Arábica' },
      { name: 'Robusta' }
    ];
    component.categories = mockCategories;
    fixture.detectChanges();
    expect(component.categories?.length).toBe(2);
    expect(component.categories?.[0].name).toBe('Arábica');
  });

  it('deve aceitar categoria selecionada via @Input', () => {
    component.selectedCategory = 'Robusta';
    fixture.detectChanges();
    expect(component.selectedCategory).toBe('Robusta');
  });
});