import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, AbstractControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   login_form:FormGroup;
   invalidcred: any;
  submitForm: any;
  constructor(private auth:AuthService,public toastr: ToastrService, vcr: ViewContainerRef, private http : Http, private router: Router) { }

  ngOnInit() {
    this.login_form = new FormGroup({
      fname: new FormControl (null, [Validators.required, Validators.minLength(4)]),
      lname: new FormControl (null, [Validators.required, Validators.minLength(4)]),
      mobnumber: new FormControl (null, [Validators.required,Validators.minLength(6), Validators.maxLength(13)]),
      email: new FormControl (null, [Validators.required, Validators.maxLength (255), Validators.email]),
      password: new FormControl (null, [Validators.required, Validators.maxLength (20), Validators.minLength(5)])
    });

    console.log (this.auth.sampleTest);
  }
  submitLogin(login_form:NgForm) {
    this.submitForm = true;
    this.invalidcred = false;
    if(this.login_form.valid){
  
    let data: any = {
      //"username": userCredentials.getEmail(),
      "first_name": this.login_form.value.fname,
      "last_name": this.login_form.value.lname,
      "number": this.login_form.value.mobnumber,
      "email": this.login_form.value.email,
      "password": this.login_form.value.password,
     
      //"client_secret": "FHboWXJfzSaM3Y8AH8aWht1XAZ9DqIIHhgt8dmeJ",
      //"client_id": 2,
      //"grant_type": "password",
    
      "role": "admin"
    };
    this.serverLoginCall(data);
    }
    // this.router.navigate(['DashboardComponent']);
     console.log (login_form);
   }
   serverLoginCall(data){
    this.http.post ('http://api.shokunidev.co.uk/v2/users/register',data).subscribe(res => {
     //this.auth.submitLogin(data).subscribe(res => {
     if(res.status){
       this.toastr.success('Successful Sign Up');
       setTimeout(() => {
       this.router.navigate(['/homepage']);
         
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
