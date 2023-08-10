import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.css']
})
export class MyVideosComponent {


  constructor(private authService: AuthService, private datePipe: DatePipe){

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

  async downloadVideo(videoUrl: any, videoName: any){
    const response = await fetch(videoUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = videoName; 
    link.click();

    // Clean up the Blob URL after the download
    URL.revokeObjectURL(blobUrl);
  }
}
