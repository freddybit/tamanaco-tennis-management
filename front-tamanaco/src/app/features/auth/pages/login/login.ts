import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private readonly router: Router = inject(Router);

  onLogin(): void {
    console.log('Formulario de inicio de sesión enviado');
    this.router.navigate(['/backoffice/players']);
  }
}
