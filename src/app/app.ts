import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
   standalone: true,
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    constructor(private router: Router) {}

goToLogin(event: Event) {
  event.preventDefault();
  window.location.href = 'login/login.html';
}

}
