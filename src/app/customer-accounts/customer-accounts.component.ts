import { Component } from '@angular/core';
import {Customer} from '../model/customer.model';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, JsonPipe} from '@angular/common';
import {BankAccountDTO} from '../model/bank-account.model';
import {CustomerService} from '../services/customer.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-customer-accounts',
  imports: [
    JsonPipe,
    DatePipe,
    CommonModule
  ],
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css'
})
export class CustomerAccountsComponent {
  customerId! : string ;
  customer! : Customer;
  accounts: BankAccountDTO[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.getCustomerAccounts();
  }

  getCustomerAccounts() {
    this.customerService.getCustomerAccounts(this.customerId).subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: (err) => {
        console.error('Error fetching accounts:', err);
      }
    });
  }
}
