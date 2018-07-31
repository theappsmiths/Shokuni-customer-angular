import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, AbstractControl,FormBuilder } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {AuthService} from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  invalidcred: any;
  submitForm: any;
  login_form:FormGroup;
  constructor(private auth:AuthService,private formBuilder: FormBuilder, public toastr: ToastrService, vcr: ViewContainerRef, private http : Http, private router: Router) {
    this.login_form = formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])]
     // password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    })
   }

  ngOnInit() {
   /*  this.login_form = new FormGroup({
      email: new FormControl (null, [Validators.required, Validators.maxLength (255), Validators.email]),
     // password: new FormControl (null, [Validators.required, Validators.maxLength (20), Validators.minLength(5)])
    }); */
  }
  submitLogin(login_form:NgForm) {
    this.submitForm = true;
    this.invalidcred = false;
    if(this.login_form.valid){
  
    let data: any = {
      //"username": userCredentials.getEmail(),
      "email": this.login_form.value.email,
      //"client_secret": "FHboWXJfzSaM3Y8AH8aWht1XAZ9DqIIHhgt8dmeJ",
      //"client_id": 2,
     // "grant_type": "password",
      "hostname":window.location.hostname+"/forgotpassword",
      "role": "admin"
    };
    this.serverLoginCall(data);
    }
    // this.router.navigate(['DashboardComponent']);
     console.log (login_form);
   }

   serverLoginCall(data){
    this.http.post ('http://api.shokunidev.co.uk/v2/users/forget-password',data).subscribe(res => {
     //this.auth.submitLogin(data).subscribe(res => {
     if(res.status){
       this.toastr.success('We have send link on your Email.');
       setTimeout(() => {
       this.router.navigate(['/resetpassword']);
         
       }, 2000);
      }
      },err => {
     if(!err.ok && err.status == 422){
       this.invalidcred = true;
       this.toastr.error('Invalid Credential.');
       console.log(err);
     }
       else if(!err.ok && err.status == 500){
            // this.navCtrl.push(VerificationPage, JSON.parse(err['_body']));
           this.toastr.error('Invalid credential');
           }
           else{
           this.toastr.error('Invalid credential.');
           }
        }) 
  }
}
