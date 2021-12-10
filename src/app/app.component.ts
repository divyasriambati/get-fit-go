import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';

  constructor(public router: Router){}
  inElegibleRoutes = [
    '/login',
    '/signup',
    '',
    '/'
  ];
  
  isElegible() {
    var router = this.router.url.split('/')

    console.log(router , "router");
    console.log(this.router.url , "router.url")
    
    if (this.inElegibleRoutes.includes(router[1]))
      return true
    return !this.inElegibleRoutes.includes(this.router.url);
  }

  public hasError = false;
}


