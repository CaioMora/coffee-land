import { Component, OnDestroy, OnInit } from '@angular/core';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { TabComponent } from '../../components/tabs/tab/tab.component';
import { sharedImports } from '../../services/shared/shared-imports';
import { CoffeeViewModel } from '../../viewModels/coffee-viewmodel';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, map, startWith, Subscription, switchMap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [sharedImports, TabsComponent, TabComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit, OnDestroy {
  orderForm!: FormGroup;
   private subs = new Subscription();

  coffee$ = this.route.paramMap.pipe(
  switchMap(params =>
    this.vm.coffees$.pipe(
      map(coffees => {
        const id = Number(params.get('id')); // força número
        if (!coffees) return null;

        // garante comparação entre tipos diferentes (ex: '1' === 1)
        const coffee = coffees.find(c => +c.id === id);
        return coffee ?? null;
      })
    )
  )
);
  
  coupon$ = combineLatest([this.coffee$, this.vm.coupons$]).pipe(
    map(([coffee, coupons]) => {
      if (!coffee || !coupons?.length) return null;
      return coupons.find(c => c.appliesTo.some(id => +id === +coffee.id)) ?? null;
    }),
    startWith(null)
  );

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private vm: CoffeeViewModel,
    private fb: FormBuilder,
  ){}

  ngOnInit(): void {
    const navState = history.state;
    console.log('navState', navState.orderData)

    // inicialize unitPrice com o price vindo do navState (que já vinha do detail com tamanho aplicado)
    this.orderForm = this.fb.group({
      coffeeId: [navState?.orderData.coffeeId],
      coffeeName: [navState?.orderData.coffeeName],
      size: [navState?.orderData.size],
      quantity: [navState?.quantity || 1],
      couponCode: [''],
      unitPrice: [navState?.price || 0], // preço unitário real (base para cálculo)
      total: [0] // iremos calcular abaixo
    });

    this.vm.loadData();

    // streams reativos com estado inicial
    const qty$ = this.orderForm.get('quantity')!.valueChanges.pipe(
      startWith(this.orderForm.get('quantity')!.value)
    );
    const unit$ = this.orderForm.get('unitPrice')!.valueChanges.pipe(
      startWith(this.orderForm.get('unitPrice')!.value)
    );

    // recompute total whenever quantity, unitPrice or coupon changes
    const totalSub = combineLatest([qty$, unit$, this.coupon$])
      .pipe(
        map(([qty, unitPrice, coupon]) => {
          const q = Number(qty) || 1;
          const u = Number(unitPrice) || 0;
          const discount = coupon ? (coupon.discountPercentage ?? 0) / 100 : 0;
          const total = u * q * (1 - discount);
          return { total, discount, coupon };
        })
      )
      .subscribe(({ total }) => {
        // atualiza total sem reemitir valueChanges (evita loop)
        this.orderForm.patchValue({ total }, { emitEvent: false });
      });

    this.subs.add(totalSub);

    // opcional: se quiser que o campo couponCode no form seja preenchido automaticamente quando um coupon existir
    const couponCodeSub = this.coupon$.subscribe(coupon => {
      if (coupon) {
        this.orderForm.patchValue({ couponCode: coupon.code }, { emitEvent: false });
      } else {
        this.orderForm.patchValue({ couponCode: '' }, { emitEvent: false });
      }
    });
    this.subs.add(couponCodeSub);

    // inicializa o total imediato (em caso de navState já ter valores)
    // (o combineLatest com startWith já fez isso, mas garantir não faz mal)
    const initQty = this.orderForm.get('quantity')!.value || 1;
    const initUnit = this.orderForm.get('unitPrice')!.value || 0;
    this.orderForm.patchValue({ total: initQty * initUnit }, { emitEvent: false });
  }

  // funções increase/decrease que você já tem — lembre-se de atualizar unitPrice ou quantity via form
  increaseQuantity() {
    const curr = Number(this.orderForm.get('quantity')!.value) || 1;
    this.orderForm.patchValue({ quantity: curr + 1 });
  }
  decreaseQuantity() {
    const curr = Number(this.orderForm.get('quantity')!.value) || 1;
    if (curr > 1) this.orderForm.patchValue({ quantity: curr - 1 });
  }

  updateTotal() {
    const price = this.orderForm.get('total')?.value || 0;
    const quantity = this.orderForm.get('quantity')?.value || 1;
    this.orderForm.patchValue({ total: price * quantity });
  }

  calculateDiscountedTotal(price: number, quantity: number = 1, discount: number = 0): number {
  const total = price * quantity;
  const discounted = total - (total * discount) / 100;
  this.orderForm.get('total')?.setValue(discounted);
  return discounted;
}

calculateTotalWithoutDiscount(price: number, quantity: number = 1): number {
  const total = price * quantity;
  this.orderForm.get('total')?.setValue(total);
  return total;
}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  submitOrder() {
    console.log('Pedido confirmado:', this.orderForm.value);
  }

  goBack() {
    this.router.navigate(['/detail-item'])
  }
}
