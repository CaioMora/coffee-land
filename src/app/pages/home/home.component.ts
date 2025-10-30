import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { CoffeeService } from '../../services/coffee.service';
import { sharedImports } from '../../services/shared/shared-imports';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Observable } from 'rxjs';
import { Coffee } from '../../models/coffees';

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

  coffees$!: Observable<Coffee[]>;

  constructor(private service: CoffeeService) {}

  ngOnInit(): void {
    this.coffees$ = this.service.getCoffees();
  }

}
