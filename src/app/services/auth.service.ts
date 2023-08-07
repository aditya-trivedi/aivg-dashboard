import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user : any = undefined;

  public userSubject = new BehaviorSubject<{ email: string, privateKey: string } | undefined>(undefined);

  constructor(private http: HttpClient) { }
 
  baseUrl = 'http://api.theaivideogenerator.com/rest-auth/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  signUp(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'registration/', data, this.httpOptions);
  }

  login(data: any) : Observable<any>{
    return this.http.post(this.baseUrl + 'login/', data, this.httpOptions)
  }

  getAivgToken() {
    return localStorage.getItem('aivg_token');
  }

  checkAuthStatusAndUpdateUser() {

    const url = 'http://api.theaivideogenerator.com/api/user/me/';
    const authToken = this.getAivgToken();
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `token ${authToken}`
    });

    const options = { 
      headers
    };

    return this.http.get(url, options);
  }

  getUserData(contentType : any){
    const authToken = this.getAivgToken();
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `token ${authToken}`
    });

    const options = { 
      headers
    };
    return this.http.get('https://api.theaivideogenerator.com/api/media/?type=' + contentType, options)
  }
}
