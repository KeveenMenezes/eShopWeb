import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly baseUrl = 'https://localhost:5050/api/';
  private readonly http = inject(HttpClient);
  private readonly title = 'eShop';
  products: Product[] = [];
  pageIndex = 1;
  pageSize = 10;

  ngOnInit(): void {
    this.http
      .get<Pagination<Product>>(
        `${this.baseUrl}products/${this.pageIndex}/${this.pageSize}`
      )
      .subscribe({
        next: (response) => {
          this.products = response.items;
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }
}
