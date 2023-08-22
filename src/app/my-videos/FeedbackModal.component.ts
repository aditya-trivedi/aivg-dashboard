import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioGroup } from '@angular/material/radio';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feedback-modal',
  template: `
  <div style="padding: 20px; position: relative;">
  <h2>Feedback for {{data['name']}}</h2>
  <form #feedbackForm="ngForm" (ngSubmit)="submitFeedback()">
    <div style="margin-bottom: 20px;">
      <label for="likedVideo">Did you like the video? *</label>
      <mat-radio-group required [(ngModel)]="likedVideo" name="likedVideo">
        <mat-radio-button value="true">Yes</mat-radio-button>
        <mat-radio-button value="false">No</mat-radio-button>
      </mat-radio-group>
    </div>
    <div>
      <label for="feedbackText"></label>
      <textarea
        rows="4"
        cols="40"
        placeholder="Give your suggestions about the video, This will help us improve our AI model."
        [(ngModel)]="feedbackText"
        name="feedbackText"
      ></textarea>
    </div>
    <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
      <button mat-icon-button color="warn" type="button" (click)="closeModal()">
        <mat-icon>close</mat-icon>
      </button>
      <button mat-raised-button color="primary" style="margin-left: 10px;" [disabled]="!feedbackForm.valid">
        Submit
        <mat-icon>done</mat-icon>
      </button>
    </div>
  </form>
</div>


  `,
})
export class FeedbackModalComponent {
    likedVideo: string = '';
  feedbackText: string = '';
  constructor(
    public dialogRef: MatDialogRef<FeedbackModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  submitFeedback() {
    console.log(this.data);
    console.log('Liked Video:', this.likedVideo);
    console.log('Feedback Text:', this.feedbackText);
    let req_body = {
        'is_happy': JSON.parse(this.likedVideo),
        'feedback': this.feedbackText
    }
    this.authService.submitFeedback(req_body,  String(this.data['id'])).subscribe(
        response => {
          // Handle successful response here
          this._snackBar.open("Thank you for your feedback", "Close", {
            duration : 4000
          })
        },
        error => {
          // Handle error here
          this._snackBar.open("Thank you for your feedback", "Close", {
            duration : 2000
          })
        }
      );

    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
}