import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from '@angular/common';
import {CustomerService} from '../services/customer.service';
import {catchError, Observable, throwError} from 'rxjs';
import {Customer} from '../model/customer.model';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customers',
  imports: [
    NgForOf,
    NgIf,
    JsonPipe,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers! : Observable<Array<Customer>>;
  errorMessage : String | undefined; //so this var will have a value or nothing or we can add to the var !
  searchFormGroup! : FormGroup;
  constructor(private customerService:CustomerService, private fb : FormBuilder,private router : Router) {
  }

  ngOnInit() { //this method executes in the debut
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
   this.handleSearchCustomers();//can print all of them because the search fuction prints them by default
  }

  handleSearchCustomers() {
     let kw=this.searchFormGroup?.value.keyword//? to if it exists
    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(error=>{
        this.errorMessage=error.message;
        return throwError(error);
      })
    );
  }

  handleDeleteCustomer(c: Customer) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
     this.customerService.deleteCustomers(c.id).subscribe({
       next : (res)=>{
         this.handleSearchCustomers();//to relaod the page after the deletion

       },
       error : err=>{
         console.log(err);
       }



       }

     )
  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl("customer-accounts/"+customer.id,{state :customer});
  }


}
