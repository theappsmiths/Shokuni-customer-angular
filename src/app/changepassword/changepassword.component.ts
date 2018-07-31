import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { FormGroup, FormControl, Validators, NgForm, AbstractControl,FormBuilder } from '@angular/forms';
import {AuthService} from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  login_form:FormGroup;
  invalidcred: any;
  submitForm: any;
  Token: any;
  constructor(private auth:AuthService,private formBuilder: FormBuilder, public toastr: ToastrService, vcr: ViewContainerRef, private http : Http, private router: Router, private spinner: NgxSpinnerService) {
    this.login_form = formBuilder.group({
      oldpasswrd: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      newpassword: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      confrmpassword: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    })
    this.Token=localStorage.getItem("acess_token");
   }

  ngOnInit() {
    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 1000);
    //this.refresh();
  }
  submitLogin(login_form:NgForm){
    //this.router.navigate(['/yourprofile']);
    this.submitForm = true;
    this.invalidcred = false;
    if(this.login_form.valid){
     
    let data: any = {
      //"username": userCredentials.getEmail(),
      "old_password": this.login_form.value.oldpasswrd,
      "password": this.login_form.value.newpassword,
     
      //"client_secret": "FHboWXJfzSaM3Y8AH8aWht1XAZ9DqIIHhgt8dmeJ",
     // "client_id": 2,
    //  "grant_type": "password",
    
      //"role": "admin"
    };
    this.serverLoginCall(data);
    }
  }
  serverLoginCall(data){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer"+" "+ this.Token
    });
    let options = new RequestOptions({ headers: headers });
    this.http.put ('http://api.shokunidev.co.uk/v2/users/change-password',data,options).subscribe(res => {
     //this.auth.submitLogin(data).subscribe(res => {
     if(res.status){
       console.log(data);
       console.log(res);
       this.toastr.success('Password Change Successful.');
       setTimeout(() => {
       this.router.navigate(['/home']);
         
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
  myDropFunc() {
    var x = document.getElementById("demoDrop");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-green";
    } else { 
        x.className = x.className.replace(" w3-show", "");
        x.previousElementSibling.className = 
        x.previousElementSibling.className.replace(" w3-green", "");
    }
}

myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
function(event) {
if (!event.target.matches('.dropbtn')) {

  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}

}






}
