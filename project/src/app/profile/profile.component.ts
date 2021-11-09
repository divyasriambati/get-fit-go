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

  public userDetails: any[] | undefined


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
  userObj: any;

  onSubmit() {
    this._userdata.currentUser = this.profileForm.value;
  }

  ngOnInit(): void {
    this.profileForm.controls['email'].disable();
    this.userservice.getUserDetails().subscribe(
      (data) => {
        console.log("current user data", data.response);
        this.userObj = data.response;
        this.loadFormData(data.response);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  loadFormData(data: any) {
    this.profileForm.patchValue({
      email: data.emailid,
      phoneno: data.phonenumber,
      gender: data.gender,
      dob: data.dateofbirth,
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zipcode,
    });
  }

  updateProfile() {
    var postObj = {
      userid: this.profileForm.value.email,//pass emailid
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
        console.log(data);
        //this.router.navigate(['/dashboard']);
        location.reload();
      },
      (err) => {
        console.log(err)
      }
    )
  }
  deleteAccount() {
    this.userservice.deleteAccount().subscribe(
      (data) => {
        console.log(data);
        localStorage.clear();
        window.location.replace(`http://localhost:4200/login`)

      },
      (err) => {
        console.log(err);
      }
    )
  }


}


