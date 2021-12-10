import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserService1 } from '../services/user/user.service';
import { serverUrl } from '../config/serverurls';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _userdata: UserService, public router: Router, public userservice: UserService1) {
    this.username = localStorage.getItem('username');
    this.username = this.username.substring(1, this.username.length - 1);
    console.log("username", this.username)
  }
  public serverUrl = serverUrl;
  public isLoaded = false;
  public filterTerm: any;
  public username: any;
  public userObj: any
  name = this._userdata.currentuser;
  coverPic = this._userdata.coverPic;
  ngOnInit(): void {
    this.userservice.getUserDetails().subscribe(
      (data) => {
        console.log("current user data", data.response);
        this.userObj = data.response;
        this.isLoaded = true;
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
