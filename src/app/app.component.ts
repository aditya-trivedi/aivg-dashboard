import { Component } from '@angular/core';
import { sideNavToolsIconList } from '../shared/utils'
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(  public authService : AuthService,
                public router : Router,
                private breakpointObserver: BreakpointObserver  ){}
  title = 'video-generator';

  sideNavToolsIconList = sideNavToolsIconList;
  isSidenavOpen = false;
  sidenavMode: 'side' | 'over' = 'side';
  
  ngOnInit(){

    if(this.authService.getAivgToken()){
      let privateKey = this.authService.getAivgToken()
      this.authService.checkAuthStatusAndUpdateUser().subscribe(
        ( response : any ) => {
          this.isSidenavOpen = !this.breakpointObserver.isMatched(Breakpoints.Handset);
          this.authService.userSubject.next({ email : response.user.email, privateKey : privateKey! })
        },
        error =>{
          console.log(error)
        }
      )
    } else {
      this.authService.userSubject.next(undefined);
    }

    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
          if(this.breakpointObserver.isMatched(Breakpoints.Handset)){
            this.isSidenavOpen = false
          }
      });
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
