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
  
  ngOnInit(){

    if(this.authService.getAivgToken()){
      console.log('token exists')
      this.authService.checkAuthStatusAndUpdateUser().subscribe(
        response => {
          console.log(response);
        },
        error =>{
          console.log(error)
        }
      )
    } else {
      this.authService.userSubject.next(undefined);
    }
  }

}
