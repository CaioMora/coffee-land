import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { TabComponent } from '../../components/tabs/tab/tab.component';
import { sharedImports } from '../../services/shared/shared-imports';
import { CoffeeViewModel } from '../../viewModels/coffee-viewmodel';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [sharedImports, TabsComponent, TabComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {

  coffee$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.vm.coffees$.pipe(
          map(coffees => coffees?.find(c => c.id === Number(params.get('id'))))
        )
      )
    );

  constructor(private router: Router, private route: ActivatedRoute, private vm: CoffeeViewModel){}

  ngOnInit(): void {
    this.vm.loadData(); // garante que está carregado caso entre direto
  }

  goBack() {
    this.router.navigate(['/detail-item'])
  }
}
