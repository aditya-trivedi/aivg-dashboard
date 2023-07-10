import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AivideoService {

  constructor(private http: HttpClient) { }


  generateImageBasedOnText(data : any) {
    return this.http.get('http://api.theaivideogenerator.com/api/images/generate/', data);
  }
}
