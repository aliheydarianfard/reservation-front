import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessService } from '../services/business.service';
import { Province } from '../models/province.model';
import { Business } from '../models/business.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  provinces: Province[] = [];
  businesses: Business[] = [];

  loadTimeBusiness: number | null = null;
  loadTimeProvince: number | null = null;
  userName: string | null = null;

  constructor(private businessService: BusinessService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const parsed = JSON.parse(currentUser);
      this.userName = parsed.unique_name; 
    }
    const startBusiness = performance.now();
    this.businessService.getBusinesses().subscribe((data) => {
      this.businesses = data;
      const endBusiness = performance.now();
      this.loadTimeBusiness = Math.round(endBusiness - startBusiness);
    });

    
  }

  navigation(item: Business): void {
    this.router.navigate(['/business-page', item.id], {
      queryParams: { category: item.categoryName },
      state: { item },
    });
  }
}
