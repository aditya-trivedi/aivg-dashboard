import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder,  private _snackBar: MatSnackBar, private authService: AuthService) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // TODO: Send the form data to the server or perform other actions
      let data = {
        'name': this.contactForm.value['name'],
        'email': this.contactForm.value['email'],
        'message': this.contactForm.value['message'],
      }
      this.authService.submitQuery(data).subscribe(
        response => {
          // Handle successful response here
          this._snackBar.open("We have received you message. We will get back to you within 24 hours", "Close", {
            duration : 4000
          })
        },
        error => {
          // Handle error here
          this._snackBar.open("You must be logged in to contact support", "Close", {
            duration : 2000
          })
        }
      );
      this.contactForm.reset()
    }
  }
}
