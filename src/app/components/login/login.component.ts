import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';
  isRegistering: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.error = '';
    
    if (this.isRegistering) {
      this.authService.register(this.username, this.password).subscribe({
        next: () => {
          this.isRegistering = false;
          this.error = 'Registration successful! Please login.';
        },
        error: (err) => {
          this.error = err.error.message || 'Registration failed';
        }
      });
    } else {
      this.authService.login(this.username, this.password).subscribe({
        next: () => {
          this.router.navigate(['/customers']);
        },
        error: (err) => {
          this.error = err.error.message || 'Login failed';
        }
      });
    }
  }

  toggleMode(): void {
    this.isRegistering = !this.isRegistering;
    this.error = '';
  }
}