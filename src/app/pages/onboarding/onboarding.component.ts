import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  constructor(private router: Router) {}

   onGetStarted() {
    // Exemplo: navega para a próxima tela
    this.router.navigate(['/home']);
  }
}
