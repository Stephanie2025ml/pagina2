import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';


@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username = '';
  password_hash = '';
  errorMessage = '';

  constructor(private loginService: LoginService) {}

  onLogin() {
    this.loginService.login(this.username, this.password_hash).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('Login exitoso:', res);
          // Login exitoso: redirige o muestra mensaje
        } else {
          this.errorMessage = res.message;
        }
      },
      error: (err) => {
        this.errorMessage = 'Error de conexión con el servidor';
      }
    });
  }
}