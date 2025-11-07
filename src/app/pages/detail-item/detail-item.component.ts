import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CoffeeViewModel } from '../../viewModels/coffee-viewmodel';
import { sharedImports } from '../../services/shared/shared-imports';
import { AsyncPipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-detail-item',
  standalone: true,
  imports: [
    sharedImports,
    AsyncPipe, 
    NgForOf],
  templateUrl: './detail-item.component.html',
  styleUrl: './detail-item.component.scss'
})
export class DetailItemComponent {
  coffee$ = this.route.paramMap.pipe(
  switchMap(params =>
    this.vm.coffees$.pipe(
      map(coffees => {
        const id = Number(params.get('id')); // força número
        if (!coffees) return null;

        // garante comparação entre tipos diferentes (ex: '1' === 1)
        const coffee = coffees.find(c => +c.id === id);
        console.log('Café encontrado:', coffee);
        return coffee ?? null;
      })
    )
  )
);


  selectedSize: 'P' | 'M' | 'G' = 'M';
  finalPrice = 0;

  constructor(private router: Router, private route: ActivatedRoute, private vm: CoffeeViewModel) {}

  ngOnInit(): void {
    this.vm.loadData();
     this.coffee$.subscribe(coffee => {
      if (coffee) {
        console.log(coffee)
        this.finalPrice = coffee.price; 
      }
    });
  }

  selectSize(size: 'P' | 'M' | 'G', basePrice: number) {
    this.selectedSize = size;
    this.finalPrice = size === 'P' ? basePrice : size === 'M' ? basePrice * 1.2 : basePrice * 1.4;
  }

  onBuy(coffee: any) {
    const orderData = {
      coffeeId: coffee.id,
      coffeeName: coffee.name,
      size: this.selectedSize,
      price: this.finalPrice
    };
    this.router.navigate(['/order', coffee.id], { state: { orderData } });
  }

  goBack() {
    this.router.navigate(['/home'])
  }
}
