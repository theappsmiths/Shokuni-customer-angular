 import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { Observable } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  public sampleTest:string = "http://api.shokunidev.co.uk/v2";
  getShopsUrl: string;

  constructor(private http : HttpClient) {
    this.getShopsUrl="http://api.shokunidev.co.uk/v2/users/login"
   }

  submitLogin(body):Observable<any>{

     var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
   
    return this.http.post ('http://api.shokunidev.co.uk/v2/users/login',body)
    
   .pipe(
    catchError(this.handleError)
    ); 
  } 
 /*  private handleError (addHero,err:HttpErrorResponse) {
    // console.log (err);
    return Observable.throw (err.message);
  } */
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
 

}
 
/* import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { GlobalVariablesService } from '../global/global-variables.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';

@Injectable()
export class AuthService {
  //payment_url:string = this.global.SERVER_URL + '/payment/make';

  constructor( private _http:HttpClient) { }

  // get HTML form of payment to send payment request
  submitLogin(values:Object): Observable<any> {
    // get payment data
    return this._http.post ('http://api.shokunidev.co.uk/v2/users/login', values, {
      responseType: 'text'
    }).pipe((data)=> {
      console.log(data);
    })
          /* .do((data) => {
             console.log (data);
          })
          .catch(this.handleError); *
  }

  private handleError (err:HttpErrorResponse) {
    // console.log (err);
    return Observable.throw (err.message);
  }
}
 */