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
 
  baseUrl = 'https://api.theaivideogenerator.com/rest-auth/'

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

    const url = 'https://api.theaivideogenerator.com/api/user/me/';
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
    return this.http.get('https://api.theaivideogenerator.com/api/media/?&page_size=100&ordering=-updated&type=' + contentType, options)
  }

  submitQuery(data: any){
    const authToken = this.getAivgToken();
    console.log(data, "insie submit query")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `token ${authToken}`
    });

    const options = { 
      headers
    };
    console.log(options, "options")
    return this.http.post('https://api.theaivideogenerator.com/api/contact-us/', data, options);
  }

  submitFeedback(data: any, media_id: string){
    const authToken = this.getAivgToken();
    console.log(data, "insie submit query")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `token ${authToken}`
    });

    const options = { 
      headers
    };
    console.log(options, "options")
    return this.http.post('https://api.theaivideogenerator.com/api/feedback/'+ media_id + '/', data, options);
  }

}
