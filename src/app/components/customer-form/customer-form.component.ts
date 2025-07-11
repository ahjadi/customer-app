import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {
  customer: Customer = {
    customerName: '',
    dateOfBirth: '',
    gender: 'M'
  };
  error: string = '';

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.error = '';
    
    this.customerService.addCustomer(this.customer).subscribe({
      next: () => {
        this.router.navigate(['/customers']);
      },
      error: (err) => {
        this.error = err.error.message || 'Failed to add customer';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/customers']);
  }
}