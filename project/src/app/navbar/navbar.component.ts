import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( public _userdata : UserService , public router : Router) { }

  public filterTerm: any;

  name = this._userdata.currentuser;
  coverPic = this._userdata.coverPic;
  ngOnInit(): void {
  }

}
