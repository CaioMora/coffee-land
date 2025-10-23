import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { TabComponent } from '../../components/tabs/tab/tab.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, MatTabsModule, TabsComponent, TabComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  selectedIndex = 0;
}
