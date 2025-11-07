import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab/tab.component';
import { QueryList } from '@angular/core';

describe('TabsComponent (sem template)', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TabsComponent, TabComponent]
    });

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;

    // Simula abas manualmente
    const tab1 = new TabComponent();
    tab1.label = 'Tab 1';
    tab1.disabled = false;

    const tab2 = new TabComponent();
    tab2.label = 'Tab 2';
    tab2.disabled = true;

    const tab3 = new TabComponent();
    tab3.label = 'Tab 3';
    tab3.disabled = false;

    // Injeta as abas simuladas
    component.tabs = new QueryList<TabComponent>();
    (component.tabs as any)._results = [tab1, tab2, tab3];
    component.ngAfterContentInit();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar tabsList com abas simuladas', () => {
    expect(component.tabsList.length).toBe(3);
    expect(component.tabsList[0].label).toBe('Tab 1');
  });

  it('deve selecionar aba habilitada e emitir evento', () => {
    spyOn(component.selectedIndexChange, 'emit');
    component.selectTab(0);
    expect(component.selectedIndex).toBe(0);
    expect(component.selectedIndexChange.emit).toHaveBeenCalledWith(0);
  });

  it('não deve selecionar aba desabilitada', () => {
    spyOn(component.selectedIndexChange, 'emit');
    component.selectTab(1);
    expect(component.selectedIndex).not.toBe(1);
    expect(component.selectedIndexChange.emit).not.toHaveBeenCalled();
  });

  it('deve atualizar indicador visual com DOM simulado', () => {
    const mockLabel = document.createElement('div');
    mockLabel.classList.add('tab-label');
    Object.defineProperty(mockLabel, 'offsetWidth', { configurable: true, value: 100 });
    Object.defineProperty(mockLabel, 'offsetLeft', { configurable: true, value: 30 });

    const mockHeader = document.createElement('div');
    mockHeader.classList.add('tab-header');
    mockHeader.appendChild(mockLabel);
    document.body.appendChild(mockHeader);

    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      return selector === '.tab-header' ? mockHeader : null;
    });

    component.selectedIndex = 0;
    component.updateIndicator();

    expect(component.indicatorWidth).toBe(100);
    expect(component.indicatorOffset).toBe(30);

    document.body.removeChild(mockHeader);
  });
});