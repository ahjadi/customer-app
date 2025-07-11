import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Customer {
  id?: number;
  customerNumber?: number;
  customerName: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
}

export interface CustomerListResponse {
  customers: Customer[];
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:4444/customers';

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<CustomerListResponse> {
    return this.http.get<CustomerListResponse>(this.apiUrl);
  }

  addCustomer(customer: Customer): Observable<any> {
    return this.http.post<any>(this.apiUrl, customer);
  }

  updateCustomer(customerId: number, customer: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${customerId}`, {
      newCustomerName: customer.customerName,
      newDateOfBirth: customer.dateOfBirth,
      newGender: customer.gender
    });
  }

  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${customerId}`);
  }
}