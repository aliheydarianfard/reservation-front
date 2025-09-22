// home-component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home-component',
  imports: [RouterLink],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss'
})
export class HomeComponent {


  constructor(private http: HttpClient) { }


}
