import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent {
  @Input() label!: string;
  @Input() icon?: string;
  @Input() disabled = false;

  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<any>;
}
