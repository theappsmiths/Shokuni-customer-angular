import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { FormGroup, FormControl, Validators, NgForm, AbstractControl,FormBuilder } from '@angular/forms';
import {AuthService} from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { format } from 'util';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  login_form:FormGroup;
  invalidcred: any;
  submitForm: any;
  iban_no: any;
  minDate: string;
  expiry_dat: any;
  ExpirYdate: string;
  Token: string;
  constructor(private auth:AuthService,private formBuilder: FormBuilder, public toastr: ToastrService, vcr: ViewContainerRef, private http : Http, private router: Router, private spinner: NgxSpinnerService) { 
    this.Token=localStorage.getItem("acess_token");
  
   
    this.login_form = formBuilder.group({
     

      cnumber: ['', Validators.compose([Validators.required, Validators.minLength(13),Validators.maxLength(19),Validators.pattern('/^[0-9]{13,19}/')])],
      csv: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(3)])],
      sortcde: ['', Validators.compose([Validators.required])],

    })
    
    console.log(this.login_form.value.sortcde)
  }
  value='';
  counter = 0;

  onChange(event) {
    this.counter = this.counter + 1; 
  }
  mychange(val) {
  /*   const self = this;
    //let chIbn = val.split('-').join('');
    let chIbn;

    if (chIbn.length > 0) {
      chIbn = chIbn.match(new RegExp('.{1,4}', 'g')).join('-');
    }
    console.log(chIbn);
    this.iban_no = chIbn; */
  }
  ngOnInit() {
    this.spinner.show();
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 1000);
  }
  cancel(){
    console.log("checked");
  }
  Submitlogin(login_form:NgForm) {
    
    console.log(this.login_form.value.cnumber);
    var dateString = this.login_form.value.sortcde;
    var todayTime = new Date(dateString);
    var month = format(todayTime .getMonth() + 1);
    var day = format(todayTime .getDate());
    var year = format(todayTime .getFullYear());
    this.ExpirYdate=month + "/"+ year;
    //return month + "/" + day + "/" + year;
    console.log(this.ExpirYdate);
    //if(this.login_form.valid){
     
      let data: any = {
        //"username": userCredentials.getEmail(),
        "card_number": this.login_form.value.cnumber,
        "cvv": this.login_form.value.csv,
        "expiry_date":this.ExpirYdate,
      
        //"client_secret": "FHboWXJfzSaM3Y8AH8aWht1XAZ9DqIIHhgt8dmeJ",
       // "client_id": 2,
      //  "grant_type": "password",
      
        //"role": "admin"
      };
      console.log(data);
      this.serverLoginCall(data);
      //}
  }

  serverLoginCall(data){
    console.log(data);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer"+" "+ this.Token
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://api.shokunidev.co.uk/v2/payment/cards',data,options).subscribe(res => {
     //this.auth.submitLogin(data).subscribe(res => {
     if(res.status){
       console.log(data);
       console.log(res);
       this.toastr.success('Card Details Change Successful.');
       setTimeout(() => {
      //this.router.navigate(['/home']);
         
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







