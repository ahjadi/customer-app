import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Customer, CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  editingCustomer: Customer | null = null;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (response) => {
        this.customers = response.customers;
      },
      error: (err) => {
        console.error('Error loading customers:', err);
      }
    });
  }

  editCustomer(customer: Customer): void {
    this.editingCustomer = { ...customer };
  }

  cancelEdit(): void {
    this.editingCustomer = null;
  }

  updateCustomer(): void {
    if (this.editingCustomer && this.editingCustomer.id) {
      this.customerService.updateCustomer(this.editingCustomer.id, this.editingCustomer).subscribe({
        next: () => {
          this.loadCustomers();
          this.editingCustomer = null;
        },
        error: (err) => {
          console.error('Error updating customer:', err);
        }
      });
    }
  }

  deleteCustomer(customerId: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(customerId).subscribe({
        next: () => {
          this.loadCustomers();
        },
        error: (err) => {
          console.error('Error deleting customer:', err);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}