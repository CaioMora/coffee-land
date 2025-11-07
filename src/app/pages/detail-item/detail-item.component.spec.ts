import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailItemComponent } from './detail-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeViewModel } from '../../viewModels/coffee-viewmodel';
import { of } from 'rxjs';

describe('DetailItemComponent', () => {
  let component: DetailItemComponent;
  let fixture: ComponentFixture<DetailItemComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockRoute: any;
  let mockViewModel: any;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRoute = {
      paramMap: of(new Map([['id', '1']])),
      snapshot: { paramMap: { get: () => '1' } }
    };
    mockViewModel = {
      coffees$: of([{ id: 1, name: 'Latte', price: 10 }]),
      loadData: jasmine.createSpy('loadData')
    };

    TestBed.configureTestingModule({
      imports: [DetailItemComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: CoffeeViewModel, useValue: mockViewModel }
      ]
    });

    fixture = TestBed.createComponent(DetailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar vm.loadData no ngOnInit', () => {
    expect(mockViewModel.loadData).toHaveBeenCalled();
  });

  it('deve definir finalPrice com base no café encontrado', (done) => {
    component.coffee$.subscribe(coffee => {
      expect(coffee?.id).toBe(1);
      expect(component.finalPrice).toBe(10);
      done();
    });
  });

  it('deve calcular o preço corretamente ao selecionar tamanho P', () => {
    component.selectSize('P', 10);
    expect(component.selectedSize).toBe('P');
    expect(component.finalPrice).toBe(10);
  });

  it('deve calcular o preço corretamente ao selecionar tamanho M', () => {
    component.selectSize('M', 10);
    expect(component.selectedSize).toBe('M');
    expect(component.finalPrice).toBe(12);
  });

  it('deve calcular o preço corretamente ao selecionar tamanho G', () => {
    component.selectSize('G', 10);
    expect(component.selectedSize).toBe('G');
    expect(component.finalPrice).toBe(14);
  });

  it('deve navegar para a tela de pedido com dados corretos', () => {
    const coffee = { id: 1, name: 'Latte' };
    component.selectedSize = 'G';
    component.finalPrice = 14;
    component.onBuy(coffee);

    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['/order', 1],
      { state: { orderData: { coffeeId: 1, coffeeName: 'Latte', size: 'G', price: 14 } } }
    );
  });

  it('deve navegar de volta para a home', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});