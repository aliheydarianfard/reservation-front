// home-component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

interface Business {
  name: string;
  category: number;
  ownerId: string;
  status: number;
  address: {
    city: string;
    street: string;
    postalCode: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  services: any[];
  schedules: any[];
  id: string;
  createdAt: string;
  updatedAt: string | null;
}

@Component({
  selector: 'app-home-component',
  imports: [RouterLink],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.scss']
})
export class HomeComponent implements OnInit {
  businesses: Business[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Business[]>('https://dev.api.timedari.ir/api/Business/all')
      .subscribe({
        next: (res) => this.businesses = res,
        error: (err) => console.error('API call failed', err)
      });
  }
}
