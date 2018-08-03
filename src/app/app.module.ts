import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
 import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from '../app/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import { ResetpasswrdComponent } from './resetpasswrd/resetpasswrd.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { YourprofileComponent } from './yourprofile/yourprofile.component';
import { PaymentComponent } from './payment/payment.component';
import { SupportComponent } from './support/support.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { NumberDirective } from '../app/numbers-only.directive';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,NumberDirective,
    DashboardComponent,
    LoginComponent,
    ForgotpasswordComponent,
    HomepageComponent,
    ResetpasswrdComponent,
    ChangepasswordComponent,
    EditprofileComponent,
    YourprofileComponent,
    PaymentComponent,
    SupportComponent,
  ],
  imports: [
    BrowserModule,HttpModule,HttpClientModule,BrowserAnimationsModule, SlideshowModule,NgxSpinnerModule,
    ReactiveFormsModule,ToastrModule.forRoot({timeOut: 2000,
      positionClass: 'toast-top-left',
      preventDuplicates: true}),
    RouterModule.forRoot ([
      {
        path: 'login',
        component: LoginComponent
      }, 
      {
        path: 'forgotpassword/:token',
        component: ForgotpasswordComponent
      },
      {
        path: 'register',
        component: DashboardComponent
      },
      {
        path: 'home',
        component: HomepageComponent
      },
      {
        path: 'resetpassword',
        component: ResetpasswrdComponent
      },
      {
        path: 'changepassword',
        component: ChangepasswordComponent
      },
      {
        path: 'yourprofile',
        component: YourprofileComponent
      },
      {
        path: 'editprofile',
        component: EditprofileComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      },
      {
        path: 'support',
        component: SupportComponent
      }
    ])
  ],
 
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
