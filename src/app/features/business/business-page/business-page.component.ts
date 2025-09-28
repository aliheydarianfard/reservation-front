import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from '../models/business.model';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-business-page-component',
  standalone: true,
  templateUrl: './business-page.component.html',
  styleUrls: ['./business-page.component.scss']
})
export class BusinessPageComponent implements OnInit {
  id: string | null = null;
  business: Business = {  name: '',
  id:'',
  categoryName: '',
  businessCategory: 0,
  address: {
    provinceName: '',
    cityName: '',
    fullAddress: '',
    postalCode: '',
  }};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');


     if (this.id) {
      this.businessService.getBusinessById(this.id).subscribe(data => {
        if(data)
        this.business = data;
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
