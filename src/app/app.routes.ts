import { Routes } from '@angular/router';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailItemComponent } from './pages/detail-item/detail-item.component';
import { OrderComponent } from './pages/order/order.component';

export const routes: Routes = [
    {path: '', component: OnboardingComponent},
    {path: 'home', component: HomeComponent},
    {path: 'detail-item/:id', component: DetailItemComponent},
    {path: 'order/:id', component: OrderComponent},
];
