import { Component } from '@angular/core';
import { sideNavToolsIconList } from '../shared/utils'
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(  public authService : AuthService,
                public router : Router  ){}
  title = 'video-generator';

  sideNavToolsIconList = sideNavToolsIconList;
  isSidenavOpen = true;
  sidenavMode: 'side' | 'over' = 'side';
  
  ngOnInit(){

    if(this.authService.getAivgToken()){
      let privateKey = this.authService.getAivgToken()
      this.authService.checkAuthStatusAndUpdateUser().subscribe(
        ( response : any ) => {
          this.authService.userSubject.next({ email : response.user.email, privateKey : privateKey! })
        },
        error =>{
          console.log(error)
        }
      )
    } else {
      this.authService.userSubject.next(undefined);
    }
  }

  signOutUser(){
    localStorage.removeItem('aivg_token');
    this.authService.userSubject.next(undefined)
    this.router.navigate(['/login'])
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.sidenavMode = this.isSidenavOpen ? 'side' : 'over';
  }

}
