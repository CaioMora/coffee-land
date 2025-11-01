import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Banner } from '../../models/banners';
import { sharedImports } from '../../services/shared/shared-imports';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('700ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('700ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class BannerComponent {
  @Input() banners: Banner[] | null = [];
  currentIndex = 0;

  selectBanner(index: number) {
    this.currentIndex = index;
  }
}
