import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer.model';
import {BankAccountDTO} from '../model/bank-account.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  backendHost:string="http://localhost:8085";
  constructor(private http:HttpClient) { }

  //function for the search
  public getCustomers() : Observable<Array<Customer>>/* the return type */{
    return this.http.get<Array<Customer>>(this.backendHost+"/customers")
  }

  public searchCustomers(keyword : string) : Observable<Array<Customer>>/* the return type */{
    return this.http.get<Array<Customer>>(this.backendHost+"/customers/search?keyword="+keyword)
  }

  public saveCustomers(customer : Customer) : Observable<Customer>/* the return type */{
    return this.http.post<Customer>(this.backendHost+"/customers",customer)
  }

  public deleteCustomers(id : number) {
    return this.http.delete<Customer>(this.backendHost+"/customers/"+id)
  }

  public getCustomerAccounts(customerId: string): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(`http://localhost:8085/customers/${customerId}/accounts`);
  }


}
