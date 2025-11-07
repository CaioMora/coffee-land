import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderComponent } from './order.component';
import { CoffeeViewModel } from '../../viewModels/coffee-viewmodel';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
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
      coffees$: of([{ id: 1, name: 'Latte' }]),
      coupons$: of([{ code: 'SAVE10', discountPercentage: 10, appliesTo: [1] }]),
      loadData: jasmine.createSpy('loadData')
    };

    TestBed.configureTestingModule({
      imports: [OrderComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: CoffeeViewModel, useValue: mockViewModel },
        FormBuilder
      ]
    });

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;

    // Simula estado de navegação
    history.pushState({ orderData: { coffeeId: 1, coffeeName: 'Latte', size: 'M' }, quantity: 2, price: 5 }, '', '');
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com dados do navState', () => {
    expect(component.orderForm.value.coffeeId).toBe(1);
    expect(component.orderForm.value.coffeeName).toBe('Latte');
    expect(component.orderForm.value.size).toBe('M');
    expect(component.orderForm.value.quantity).toBe(2);
    expect(component.orderForm.value.unitPrice).toBe(5);
  });

  it('deve calcular o total com desconto corretamente', () => {
    const total = component.calculateDiscountedTotal(10, 2, 10);
    expect(total).toBe(18);
    expect(component.orderForm.get('total')?.value).toBe(18);
  });

  it('deve calcular o total sem desconto corretamente', () => {
    const total = component.calculateTotalWithoutDiscount(10, 2);
    expect(total).toBe(20);
    expect(component.orderForm.get('total')?.value).toBe(20);
  });

  it('deve aumentar a quantidade', () => {
    component.orderForm.patchValue({ quantity: 2 });
    component.increaseQuantity();
    expect(component.orderForm.get('quantity')?.value).toBe(3);
  });

  it('deve diminuir a quantidade', () => {
    component.orderForm.patchValue({ quantity: 2 });
    component.decreaseQuantity();
    expect(component.orderForm.get('quantity')?.value).toBe(1);
  });

  it('não deve diminuir a quantidade abaixo de 1', () => {
    component.orderForm.patchValue({ quantity: 1 });
    component.decreaseQuantity();
    expect(component.orderForm.get('quantity')?.value).toBe(1);
  });

  it('deve navegar de volta ao detalhe', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/detail-item']);
  });

  it('deve chamar vm.loadData no ngOnInit', () => {
    expect(mockViewModel.loadData).toHaveBeenCalled();
  });

  it('deve limpar subscrições no ngOnDestroy', () => {
    spyOn(component['subs'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subs'].unsubscribe).toHaveBeenCalled();
  });
});