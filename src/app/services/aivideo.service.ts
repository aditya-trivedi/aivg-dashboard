import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AivideoService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  authToken = this.authService.getAivgToken();
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `token ${this.authToken}`
  });

  options = { 
    headers : this.headers
  };

  file_headers = new HttpHeaders({
    'Authorization': `token ${this.authToken}`
  });
  file_options = { 
    headers : this.file_headers
  };


  generateImageBasedOnText(data : any) {
    return this.http.post('https://api.theaivideogenerator.com/api/images/generate/', data, this.options);
  }

  generateAudioForArticleText(data : any, isPremium : boolean){
    const param = !isPremium ? '?voice_type=polly' : '?voice_type=elevenlabs';
    return this.http.post('https://api.theaivideogenerator.com/api/audio/generate/' + param, data, this.options);
  }

  uploadFile(formData: any){
    return this.http.post('https://api.theaivideogenerator.com/api/media/',formData,this.file_options).toPromise();
  }

  generateVideo(data: any){
    return this.http.post('https://api.theaivideogenerator.com/api/video/generate/', data, this.options);
  }


}
