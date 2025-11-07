import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CoffeeViewModel } from '../../viewModels/coffee-viewmodel';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockViewModel: any;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockViewModel = {
      filteredCoffees$: of([
        {
          id: 1,
          name: 'Caffe Mocha',
          type: 'Espresso',
          category: 'Arábica',
          price: 4.53,
          image: '/assets/cafe1.png',
          rating: 4.5
        }
      ]),
      banners$: of([
        { id: 1, title: 'promoção disponível', image: '/assets/banner1.png' },
        { id: 2, title: 'promoção disponível', image: '/assets/banner2.png' }
      ]),
      categories$: of([
        { name: 'Arábica' },
        { name: 'Robusta' },
        { name: 'Liberica' },
        { name: 'Excelsa' }
      ]),
      selectedCategory$: of('Arábica'),
      loadData: jasmine.createSpy('loadData'),
      setSelectedCategory: jasmine.createSpy('setSelectedCategory')
    };

    TestBed.configureTestingModule({
      imports: [HomeComponent, BrowserAnimationsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CoffeeViewModel, useValue: mockViewModel }
      ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar vm.loadData no ngOnInit', () => {
    expect(mockViewModel.loadData).toHaveBeenCalled();
  });

  it('deve navegar para o detalhe do café ao chamar goToDetail', () => {
    component.goToDetail(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/detail-item', 1]);
  });

  it('deve chamar setSelectedCategory ao selecionar uma categoria', () => {
    component.onCategorySelected('Robusta');
    expect(mockViewModel.setSelectedCategory).toHaveBeenCalledWith('Robusta');
  });

  it('deve renderizar cafés corretamente', (done) => {
    component.coffees$.subscribe(coffees => {
      expect(coffees.length).toBe(1);
      expect(coffees[0].name).toBe('Caffe Mocha');
      expect(coffees[0].rating).toBe(4.5);
      done();
    });
  });

  it('deve renderizar banners corretamente', (done) => {
  component.banners$.subscribe(banners => {
    const imagens = banners?.map(b => b.image);
    expect(imagens?.some(img => img.endsWith('banner1.png'))).toBeTrue();
    expect(imagens?.some(img => img.endsWith('banner2.png'))).toBeTrue();
    done();
  });
});

  it('deve renderizar categorias corretamente', (done) => {
    component.categories$.subscribe(categories => {
      expect(categories?.length).toBe(4);
      expect(categories?.map(c => c.name)).toContain('Excelsa');
      done();
    });
  });

  it('deve refletir a categoria selecionada corretamente', (done) => {
    component.selectedCategory$.subscribe(category => {
      expect(category).toBe('Arábica');
      done();
    });
  });
});