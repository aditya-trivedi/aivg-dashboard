import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.css']
})
export class MyVideosComponent {


  constructor(private authService: AuthService){

  }

  isContentLoading = true;
  allContent : any = [];

  ngOnInit(){
    this.isContentLoading = true;
    const contentType = "V"
    this.authService.getUserData(contentType).subscribe(
      ( res : any ) => {
        this.allContent = res.results;
        this.isContentLoading = false;
      } ,
      ( err : any) => {
        // Show Snackbar
        this.isContentLoading = false;
      }
    )
  }

  downloadVideo(videoUrl: any, videoName: any){
    let a = document.createElement("a");
    a.href = videoUrl;
    a.download =  videoName;
    a.click();
    a.remove();
  }
}
