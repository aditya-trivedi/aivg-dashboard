import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackModalComponent } from './FeedbackModal.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.css']
})
export class MyVideosComponent {
  isSmallScreen = false;


  constructor(private authService: AuthService, private datePipe: DatePipe, private snackBar: MatSnackBar, private dialog: MatDialog
    ,private breakpointObserver: BreakpointObserver){
      this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });

  }

  isContentLoading = true;
  allContent : any = [];
  showFeedbackBox: boolean = false;

  ngOnInit(){
    this.isContentLoading = true;
    const contentType = "V"
    this.loadData(contentType)
  }

  async loadData(contentType: string) {
    try {
      const res: any = await this.authService.getUserData(contentType).toPromise();
      this.allContent = res.results;
      this.isContentLoading = false;
      this.updateAuthUserAndShowSatismeter();
    } catch (err) {
      // Show Snackbar
      this.isContentLoading = false;
    }
  }

  async updateAuthUserAndShowSatismeter() {
    try {
      if (this.allContent.length > 0){
      (function() {
        window.satismeter = window.satismeter || function() {
          (window.satismeter.q = window.satismeter.q || []).push(arguments);
        };
        var script = document.createElement("script");
        var parent = document.getElementsByTagName("script")[0].parentNode;
        script.async = true;
        script.src = "https://app.satismeter.com/js";
        if (parent) {
          parent.appendChild(script);
        }
      })();
      window.satismeter({
        writeKey: "FF4PinajgyNayApQaOPerPOO0LJyBfWA",
        userId: this.authService.userSubject.value.id, // TODO Replace with current user unique ID (required)
        traits: {
          email: this.authService.userSubject.value.email // TODO Replace with current user email (optional)
        }
      });
    }
    } catch (error) {
      console.log(error);
    }
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
  toggleFeedbackBox() {
    this.showFeedbackBox = !this.showFeedbackBox;
  }

  submitFeedback() {

  }

  openFeedbackModal(media_id: any, name: string) {
    const dialogRef = this.dialog.open(FeedbackModalComponent, {
      width: '400px',
      data: {
        'id': media_id,
        'name': name
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // handle the result after the modal is closed, if needed
    });
  }
}
