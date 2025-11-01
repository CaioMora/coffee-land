import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { CoffeeService } from '../../services/coffee.service';
import { sharedImports } from '../../services/shared/shared-imports';
import { AsyncPipe, NgForOf } from '@angular/common';
import { CoffeeViewModel } from '../../viewModels/coffee-viewmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    sharedImports,
    AsyncPipe, 
    NgForOf, 
    BannerComponent],
  providers: [CoffeeService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  coffees$ = this.vm.coffees$;
  banners$ = this.vm.banners$;
  categories$ = this.vm.categories$;

  constructor(private vm: CoffeeViewModel, private router: Router) {}

  ngOnInit(): void {
    this.vm.loadData();
  }

  goToDetail(id: number) {
    this.router.navigate(['/detail-item', id]);
  }

}
