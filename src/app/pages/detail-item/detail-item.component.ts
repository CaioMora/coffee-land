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
        map(coffees => coffees?.find(c => c.id === Number(params.get('id'))))
      )
    )
  );

  constructor(private router: Router, private route: ActivatedRoute, private vm: CoffeeViewModel) {}

  ngOnInit(): void {
    this.vm.loadData(); // garante que está carregado caso entre direto
  }

  onBuy(id: number) {
    this.router.navigate(['/order', id])
  }

  goBack() {
    this.router.navigate(['/home'])
  }
}
