// home-component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-home-component',
  imports: [RouterLink],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private http: HttpClient) {}


}
