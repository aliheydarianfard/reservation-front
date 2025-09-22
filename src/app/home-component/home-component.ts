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
export interface City {
  id: string;
  name: string;
}

export interface Province {
  id: string;
  name: string;
  cities: City[];
}

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.scss']
})

export class HomeComponent implements OnInit {
  provinces: Province[] = [];
 businesses: Business[] = [];

  constructor(private http: HttpClient) {}

 loadTimeBusiness: number | null = null;
loadTimeProvince: number | null = null;

ngOnInit(): void {
  const startBusiness = performance.now();
  this.http.get<Business[]>('https://dev.api.timedari.ir/api/Business/all')
    .subscribe({
      next: (data) => {
        this.businesses = data;
        const endBusiness = performance.now();
        this.loadTimeBusiness = Math.round(endBusiness - startBusiness);
      },
      error: (err) => console.error('API error:', err)
    });

  const startProvince = performance.now();
  this.http.get<Province[]>('https://dev.api.timedari.ir/api/Locations/all-with-cities')
    .subscribe({
      next: (data) => {
        this.provinces = data;
        const endProvince = performance.now();
        this.loadTimeProvince = Math.round(endProvince - startProvince);
      },
      error: (err) => console.error('API error:', err)
    });
}

}