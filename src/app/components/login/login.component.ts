import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  showLoginForm = false;
  signUpError = '';
  signUpButtonText = 'Sign Up';
  loginError = '';
  loginButtonText = 'Login';

  ngOnInit(): void {
    if (this.authService.userSubject.value)
      this.router.navigate(['/article-to-video']);
  }

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onLoginSubmit() {
    this.loginButtonText = 'Logging in...';
    this.loginError = '';
    let loginData: any = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(loginData).subscribe(
      (response) => {
        this.authService.userSubject.next({ email : this.signUpForm.value.email});
        localStorage.setItem('aivg_token', response.key);
        this.callMeAPI()
        loginData = {};
        this._snackBar.open('Sign in successful', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/article-to-video']);
      },
      (error) => {
        console.log(error)
        this.loginButtonText = 'Login'
        this.loginError = 'Something went wrong'
      }
    );
  }

  onSignUpSubmit() {
    this.signUpButtonText = 'Signing Up...';
    this.signUpError = '';
    let signUpData: any = {
      email: this.signUpForm.value.email,
      username: this.signUpForm.value.email,
      password1: this.signUpForm.value.password,
      password2: this.signUpForm.value.password,
    };

    this.authService.signUp(signUpData).subscribe(
      (response) => {
        this.authService.userSubject.next({ email : this.signUpForm.value.email});
        localStorage.setItem('aivg_token', response.key);
        this.callMeAPI()
        signUpData = {};
        this._snackBar.open('Sign up successful', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/article-to-video']);
      },
      (error) => {
        this.signUpButtonText = 'Sign Up';
        let err = error.error;
        if (err.email) {
          this.signUpError = err.email[0];
        } else if (err.password1) {
          this.signUpError = err.password1[0];
        } else {
          this.signUpError = 'Something went wrong';
        }
      }
    );
  }
  callMeAPI() {
    this.authService.checkAuthStatusAndUpdateUser().subscribe(
      ( response : any ) => {
        this.authService.userSubject.next(response['user'])
      },
      ( error : any ) =>{
        console.log(error)
      }
    ) 
  }
}
