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
  ) {}

public userDetails :any [] | undefined


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
    this.userservice.getUserDetails().subscribe(
      (data) => {
        console.log("current user data", data.response);
        this.userDetails = data.response;
        this.loadFormData();
      },
      (err) => {
        console.log(err);
      }
    )
  }


  loadFormData() {
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
      phonenumber: this.profileForm.value.phoneno,//pass phone number
      dateofbirth: this.profileForm.value.dob,//pass dob
      gender: this.profileForm.value.gender,//pass gender
      street: this.profileForm.value.street,//pass street
      zipcode: this.profileForm.value.zip,//pass zipcode
      city: this.profileForm.value.city,//pass city
      state: this.profileForm.value.state//pass state
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


