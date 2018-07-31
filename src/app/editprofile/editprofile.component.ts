import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { FormGroup, FormControl, Validators, NgForm, AbstractControl,FormBuilder } from '@angular/forms';
import {AuthService} from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  login_form:FormGroup;
  invalidcred: any;
  submitForm: any;
  countries: any;
  constructor(private auth:AuthService,private formBuilder: FormBuilder, public toastr: ToastrService, vcr: ViewContainerRef, private http : Http, private router: Router) {
    //this.refresh();
    this.login_form = formBuilder.group({
      fname: ['', Validators.compose([Validators.email, Validators.required])],
      lname: ['', Validators.compose([Validators.email, Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      number: new FormControl (null, [Validators.required,Validators.minLength(6), Validators.maxLength(13)]),
      country: ['', Validators.compose([Validators.email, Validators.required])]
    })
   }

  ngOnInit() {
   // this.refresh();
    this.doGET();
  }
  doGET() {
    console.log("GET");
   let url = "http://api.shokunidev.co.uk/v2/countries/get";
    let search = new URLSearchParams();
   // search.set('foo', 'moo');
    //search.set('limit', 25);
    this.http.get(url).subscribe(res =>
      this.countries=res.json().data
      //console.log(res.json()
    ); 
     // this.countries=res.json().data;
      console.log(this.countries);
  }
  delete(){
    
  }
}
