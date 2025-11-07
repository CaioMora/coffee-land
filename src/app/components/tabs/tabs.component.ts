import { ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  @Input() selectedIndex = 0;
  @Output() selectedIndexChange = new EventEmitter<number>();

  indicatorWidth = 0;
  indicatorOffset = 0;

  tabsList: TabComponent[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.tabsList = this.tabs.toArray();
    setTimeout(() => this.updateIndicator(), 0);
  }

  selectTab(i: number) {
    if (this.tabsList[i].disabled) return;
    this.selectedIndex = i;
    this.selectedIndexChange.emit(i);
    this.updateIndicator();
  }

  updateIndicator() {
    const header = document.querySelector('.tab-header') as HTMLElement;
    if (!header) return;

    const labels = header.querySelectorAll('.tab-label') as unknown as HTMLElement[];
    const el = labels[this.selectedIndex];
    if (!el) return;

    this.indicatorWidth = el.offsetWidth;
    this.indicatorOffset = el.offsetLeft;

    this.cdr.detectChanges();
  }
}
