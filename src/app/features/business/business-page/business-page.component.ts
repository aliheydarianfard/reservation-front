import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from '../models/business.model';

@Component({
  selector: 'app-business-page-component',
  imports: [],
  templateUrl: './business-page.component.html',
  styleUrl: './business-page.component.scss'
})
export class BusinessPageComponent implements OnInit {
  id: number | null = null;
  item: Business = {  name: '',
  categoryName: '',
  businessCategory: 0,
  address: {
    provinceName: '',
    cityName: '',
    fullAddress: '',
    postalCode: '',
  }};

  constructor(private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    // گرفتن index از URL
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // گرفتن item از state
    this.item = history.state.item;
  }

  goBack() {
  this.router.navigate(['/']);
}
}
