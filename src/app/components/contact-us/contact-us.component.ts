import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder,  private _snackBar: MatSnackBar) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // TODO: Send the form data to the server or perform other actions
      console.log('Form submitted:', this.contactForm.value);
      this.contactForm.reset()
      this._snackBar.open("We have received you message. We will get back to you within 24 hours", "Close", {
        duration : 4000
      })
    }
  }
}
