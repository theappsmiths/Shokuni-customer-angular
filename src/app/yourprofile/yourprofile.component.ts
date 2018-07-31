import { Component, OnInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { FormGroup, FormControl, Validators, NgForm, AbstractControl,FormBuilder } from '@angular/forms';
import {AuthService} from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-yourprofile',
  templateUrl: './yourprofile.component.html',
  styleUrls: ['./yourprofile.component.css']
})
export class YourprofileComponent implements OnInit {
  login_form:FormGroup;
  invalidcred: any;
  submitForm: any;
  formGroup = this.fb.group({
    file: [null, Validators.required]
  });
  file1: any;
  Token: string;
  countries: any;
  image_path: string;
  profilee: any;
  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log(file);
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
          
        });
        this.file1=file;
        console.log(this.file1);
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }
  constructor(private auth:AuthService,private formBuilder: FormBuilder, public toastr: ToastrService, vcr: ViewContainerRef, private http : Http, private router: Router,private fb: FormBuilder, private cd: ChangeDetectorRef,private spinner: NgxSpinnerService) { 
    this.login_form = formBuilder.group({
      fname: new FormControl (null, [Validators.required, Validators.minLength(14)]),
      lname: new FormControl (null, [Validators.required, Validators.minLength(14)]),
      email: ['', Validators.compose([Validators.email, Validators.required])],
      number: new FormControl (null, [Validators.required,Validators.minLength(6), Validators.maxLength(13)]),
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
     country: ['', Validators.compose([Validators.email, Validators.required])]
    })
    this.Token=localStorage.getItem("acess_token");
  }
  onEnter(){
    this.ngOnInit();
  } 
  ngOnInit() {
    this.spinner.show();
 
    setTimeout(() => {
      this.profile();
    this.doGET();
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 1000);
    
  }
  
  upload_image(){
    console.log(this.file1);

    var form = new FormData();
    form.append("image[]", this.file1);
    form.append("directory", "avatar");

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://api.shokunidev.co.uk/v2/image",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer"+" "+ this.Token,
    "Cache-Control": "no-cache",
    "Postman-Token": "3934092c-a29d-4da6-8413-62c3d9eb82ba"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
  console.log(response);
  var data=JSON.parse(response);
  var path=data.data;
  console.log(path);
  localStorage.setItem("data",path);
});

  }


  profile() {
    console.log("GET");
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer"+" "+ this.Token
    });
    let options = new RequestOptions({ headers: headers });
    let url = 'http://api.shokunidev.co.uk/v2/users/detail';
    this.http.get(url,options).subscribe(res =>{
      var data=JSON.parse(res.text());
      console.log(data.data);
      console.log(res.text())
    } 
    
    
  ); 
  
  }





   profileget(){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer"+" "+ this.Token
    });
    let options = new RequestOptions({ headers: headers });
    let url = "http://api.shokunidev.co.uk/v2/users/detail";
    let search = new URLSearchParams();
   // search.set('foo', 'moo');
    //search.set('limit', 25);
    this.http.get(url,options).subscribe(res =>
      this.profilee=res.json().data   
    ); 
     //this.profilee=res.json().data;
      console.log(this.profilee);
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
  submitLogin(login_form:NgForm){
    this.image_path=localStorage.getItem("data");
    //this.upload_image();
    this.submitForm = true;
    this.invalidcred = false;
    ///if(this.login_form.valid){
  
    let data: any = {
      //"username": userCredentials.getEmail(),
      "email": this.login_form.value.email,
      "password": this.login_form.value.password,
       "first_name":this.login_form.value.fname, 
       "last_name":this.login_form.value.lname, 
      "number": this.login_form.value.number,
      "image": this.image_path
      
    };
    this.serverLoginCall(data);
   // }
  }

  serverLoginCall(data){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer"+" "+ this.Token
    });
    let options = new RequestOptions({ headers: headers });
    this.http.put('http://api.shokunidev.co.uk/v2/users/detail',data,options).subscribe(res => {
     //this.auth.submitLogin(data).subscribe(res => {
       
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
openNav() {
  document.getElementById("logout").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
/* function(event) {
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
} */

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
