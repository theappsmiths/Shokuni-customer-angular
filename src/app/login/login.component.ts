import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { FormGroup, FormControl, Validators, NgForm, AbstractControl,FormBuilder } from '@angular/forms';
import {AuthService} from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


//import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
/* import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner'; */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login Form';

  login_form:FormGroup;
  invalidcred: any;
  submitForm: any;
  constructor(private auth:AuthService,private formBuilder: FormBuilder, public toastr: ToastrService, vcr: ViewContainerRef, private http : Http, private router: Router,private spinner: NgxSpinnerService) { 
    //this.toastr.setRootViewContainerRef(vcr);
    this.login_form = formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    })
  }

  ngOnInit() {
    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 2000);
    
    /* this.login_form = new FormGroup({
      email: new FormControl (null, [Validators.required, Validators.maxLength (255), Validators.email,Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      password: new FormControl (null, [Validators.required, Validators.maxLength (20), Validators.minLength(5)]),
      
    }); */
  }
  submitLogin(login_form:NgForm) {
    this.submitForm = true;
    this.invalidcred = false;
    if(this.login_form.valid){
  
    let data: any = {
      //"username": userCredentials.getEmail(),
      "username": this.login_form.value.email,
      "password": this.login_form.value.password,
     
      "client_secret": "FHboWXJfzSaM3Y8AH8aWht1XAZ9DqIIHhgt8dmeJ",
      "client_id": 2,
      "grant_type": "password",
    
      "role": "admin"
    };
    this.serverLoginCall(data);
    }
  
   }
   serverLoginCall(data){
    //this.spinnerService.show();
    this.spinner.show();
   
     this.http.post ('http://api.shokunidev.co.uk/v2/users/login',data).subscribe(res => {
      //this.auth.submitLogin(data).subscribe(res => {
        setTimeout(() => {
      if(res.status){
        //localStorage.setItem('ConsumerData', JSON.stringify(res));
        console.log(data);
        console.log(res['_body']);
        var data=(JSON.parse(res['_body']));
        var token=data.access_token;
        localStorage.setItem("acess_token",token);
        console.log(token);
        
        this.toastr.success('Successful Sign In');
        setTimeout(() => {
        
          
        }, 2000);
       }
       this.router.navigate(['/home']);
       this.spinner.hide();
    }, 2000);
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
