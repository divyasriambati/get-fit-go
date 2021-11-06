import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserService1 } from '../services/user/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    public _userdata: UserService,
    public router: Router,
    private fb: FormBuilder,
    private userservice: UserService1
  ) { }
  public name = this._userdata.currentuser;
  public coverPic = this._userdata.coverPic;









  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    phoneno: [''],
    dob: [''],
    gender: [''],
    street: [''],
    city: [''],
    state: [''],
    zip: [''],
  });

  userData = [];

  onSubmit() {
    this._userdata.currentUser = this.profileForm.value;
  }

  ngOnInit(): void {
    this.profileForm.patchValue({
      firstName: this._userdata.currentUser.firstName,
      lastName: this._userdata.currentUser.lastName,
      email: this._userdata.currentUser.email,
      phoneno: this._userdata.currentUser.phoneno,
      gender: this._userdata.currentUser.gender,
      dob: this._userdata.currentUser.dob,
      street: this._userdata.currentUser.street,
      city: this._userdata.currentUser.city,
      state: this._userdata.currentUser.state,
      zip: this._userdata.currentUser.zip,
    });
  }

  updateProfile() {
    var postObj = {
      userid: '',//pass emailid
      phonenumber: '',//pass phone number
      dateofbirth: '',//pass dob
      gender: '',//pass gender
      street: '',//pass street
      zipcode: '',//pass zipcode
      city: '',//pass city
      state: ''//pass state
    }
    this.userservice.updateUserDetails(postObj).subscribe(
      (data) => {
        console.log(data)
      },
      (err) => {
        console.log(err)
      }
    )
  }



}


