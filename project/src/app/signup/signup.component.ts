import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private _userdata: UserService,
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  userForm = this.fb.group({
    firstName: [''],
    email: [''],
    password:[''],
    phoneno: [''],
    dob: [''],
    gender: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
  });

  public alreadyUser = false;

  signup() {
    let result = false;
    for (let index = 0; index < this._userdata.users.length; index++) {
      if (
        this.userForm.value.username ==
        this._userdata.users[index]['firstname'] &&
        this.userForm.value.email == this._userdata.users[index]['email'] &&
        this.userForm.value.password == this._userdata.users[index]['password']
      ) {
        result = true;

        // this._userdata.currentuser = this._userdata.users[index]['firstname'] +' '+this._userdata.users[index]['lastname'];
        // this._userdata.userEmail = this._userdata.users[index]['email'];
        // this._userdata.userPhoneno = this._userdata.users[index]['phoneno'];
        // this._userdata.userGender = this._userdata.users[index]['gender'];
        // this._userdata.userDob = this._userdata.users[index]['dob'];
        // this._userdata.coverPic = this._userdata.users[index]['pic'];
      }
    }

    if (result) {
      this.alreadyUser = true;
    } else {
      this._userdata.users.push(this.userForm.value);
      this._userdata.currentUser = this.userForm.value;
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void { }


  //balaji function 
  signUp() {
    var postObj = {
      "name":  this.userForm.value.firstName,//pass name,
      "emailid": this.userForm.value.email,//pass email id
      "password": this.userForm.value.password //pass password
    }
    console.log(postObj);

    this.authService.signup(postObj).subscribe(
      (data) => {
        this.router.navigate(['/dashboard']);
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }


}
