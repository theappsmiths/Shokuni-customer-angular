import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';

//import { FormGroup, FormControl, Validators, NgForm, AbstractControl } from '@angular/forms';
//import { Router } from '@angular/router';
//import { DashboardComponent } from './dashboard/dashboard.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //providers: [Router]
})
export class AppComponent implements OnInit {
  
  
  //router: any;
  constructor() {}
  ngOnInit () {
    
    
  }
  RouterConfig = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent,
      children: [
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent }
      ] 
    }
  ];
  /**
   * Method to submit login form
   */
  
}
