import { Component, Input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, MatTabsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  selectedIndex = 0;
}
