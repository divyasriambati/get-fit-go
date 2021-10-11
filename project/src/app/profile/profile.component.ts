import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( public _userdata : UserService , public router : Router,private fb:FormBuilder) { }
  name = this._userdata.currentuser;

  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email:[''],
    phoneno:[''],
    dob:[''],
    gender:[''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });

  ngOnInit(): void {
  }

}
