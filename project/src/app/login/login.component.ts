import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {




  constructor(public _userdata: UserService, public router: Router, private loginService: LoginService) { }

  public userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),

  });


  public alreadyUser = true

  login() {

    let result = false
    for (let index = 0; index < this._userdata.users.length; index++) {
      if (
        this.userForm.value.email == this._userdata.users[index]['email'] &&
        this.userForm.value.password == this._userdata.users[index]['password']) {
        result = true
        this._userdata.currentUser = this._userdata.users[index];
        this._userdata.currentuser = this._userdata.users[index]['firstname'] + ' ' + this._userdata.users[index]['lastname'];
        // this._userdata.userEmail = this._userdata.users[index]['email']; 
        // this._userdata.userPhoneno = this._userdata.users[index]['phoneno']; 
        // this._userdata.userGender = this._userdata.users[index]['gender']; 
        // this._userdata.userDob = this._userdata.users[index]['dob']; 
        this._userdata.coverPic = this._userdata.users[index]['pic'];
      }
    }


    if (!result) {
      this.alreadyUser = true
    }
    else {

      this.router.navigate(['/dashboard'])
    }

  }

  ngOnInit(): void {
  }

  public errData:any


  //balaji function
  userLogin() {
    var postObj = {
      // "name": this.userForm.value.username,//pass name,
      "emailid": this.userForm.value.email,//pass email id
      "password": this.userForm.value.password //pass password
    }
    console.log(postObj)
    this.loginService.login(postObj).subscribe(
      (data:any) => {

       
        console.log(data);
        this.errData = data;
       
         if(this.errData.message == 'user doesnot have account'){
          this.alreadyUser = false
        }
        else if(this.errData.message == 'ok'){
          this.alreadyUser = true
          this.router.navigate(['/dashboard']);
        }
      },
      (err) => {
        console.log(err);
      }
    )
    
  }

}
