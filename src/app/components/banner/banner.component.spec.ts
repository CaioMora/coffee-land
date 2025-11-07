import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from './banner.component';
import { Banner } from '../../models/banners';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  const mockBanners: Banner[] = [
    { id: 1, title: 'promoção disponível', image: '/assets/banner1.png' },
    { id: 2, title: 'promoção disponível', image: '/assets/banner2.png' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BannerComponent, BrowserAnimationsModule]
    });

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve aceitar banners via @Input', () => {
    component.banners = mockBanners;
    fixture.detectChanges();
    expect(component.banners?.length).toBe(2);
    expect(component.banners?.[0].image).toContain('banner1.png');
  });

  it('deve iniciar com currentIndex igual a 0', () => {
    expect(component.currentIndex).toBe(0);
  });

  it('deve atualizar currentIndex ao chamar selectBanner', () => {
    component.selectBanner(1);
    expect(component.currentIndex).toBe(1);
  });

  it('deve manter currentIndex dentro dos limites dos banners', () => {
    component.banners = mockBanners;
    component.selectBanner(0);
    expect(component.currentIndex).toBe(0);
    component.selectBanner(mockBanners.length - 1);
    expect(component.currentIndex).toBe(1);
  });
});