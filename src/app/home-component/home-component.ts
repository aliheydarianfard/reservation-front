import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Business {
  name: string;
  categoryName: string;
  businessCategory: number;
  address: {
    provinceName: string;
    cityName: string;
    fullAddress: string;
    postalCode: string;
  };
}
@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.scss']
})
export class HomeComponent implements OnInit {
  businesses: Business[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.http.get<Business[]>('https://dev.api.timedari.ir/api/Business/all')

      .subscribe({
        next: (data) => this.businesses = data,
        error: (err) => console.error('API error:', err)
      });
  }
}
