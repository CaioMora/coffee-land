import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, CommonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  cafes = [
    {
      nome: 'Caffe Mocha',
      tipo: 'Deep Foam',
      preco: 4.53,
      imagem: "assets/cafe1.png"
    },
    {
      nome: 'Flat White',
      tipo: 'Espresso',
      preco: 3.53,
      imagem: 'assets/cafe2.png'
    }, 
     {
      nome: 'Flat White',
      tipo: 'Espresso',
      preco: 3.53,
      imagem: 'assets/cafe2.png'
    }
  ];

  ngOnInit(): void {}
}
