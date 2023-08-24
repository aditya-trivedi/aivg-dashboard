import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {

  showTopTryNow = false;

  constructor(private breakpointObserver : BreakpointObserver){}

  ngOnInit(){
    this.showTopTryNow = !this.breakpointObserver.isMatched(Breakpoints.Handset);
  }
}
