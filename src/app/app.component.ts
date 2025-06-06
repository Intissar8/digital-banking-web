import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './services/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  http = inject(HttpClient);
  constructor(private authService : AuthService) {
  }
  ngOnInit(): void {
    this.http.get('https://jsonplaceholder.typicode.com/posts/1').subscribe(console.log);
    this.authService.loadJwtTokenFromLocalStorage();
  }
  title = 'digital-banking-web';
}
