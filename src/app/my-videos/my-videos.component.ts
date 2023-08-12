import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.css']
})
export class MyVideosComponent {


  constructor(private authService: AuthService, private datePipe: DatePipe, private snackBar: MatSnackBar){

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

  getTooltipMessage(status: string): string {
    if (status === 'C') {
        return 'Your video generation is complete.';
    } else if (status === 'P') {
        return 'Reload the page for updated status. It usually takes 2-5 minutes to generate a video';
    } else {
        return '';
    }
  }

  async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      this.snackBar.open('Video link copied to clipboard', '', {
        duration: 2000
      });
    } catch (error) {
      console.error('Unable to copy text to clipboard', error);
    }
  }
}
