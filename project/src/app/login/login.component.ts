import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  

  constructor( public _userdata : UserService , public router : Router) { }
  
  public userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    
  });

  
  public alreadyUser = false

  login(){
       
    let result = false
    for(let index=0; index< this._userdata.users.length;index++){
        if(
        this.userForm.value.email == this._userdata.users[index]['email'] && 
        this.userForm.value.password == this._userdata.users[index]['password'])
        {
          result = true
          this._userdata.currentUser = this._userdata.users[index];
          this._userdata.currentuser = this._userdata.users[index]['firstname'] +' '+this._userdata.users[index]['lastname'];
          // this._userdata.userEmail = this._userdata.users[index]['email']; 
          // this._userdata.userPhoneno = this._userdata.users[index]['phoneno']; 
          // this._userdata.userGender = this._userdata.users[index]['gender']; 
          // this._userdata.userDob = this._userdata.users[index]['dob']; 
          this._userdata.coverPic = this._userdata.users[index]['pic']; 
        }
    }
    

  if(!result ){
    this.alreadyUser =true
  }
  else{
    
    this.router.navigate(['/dashboard'])
  }

  }

  ngOnInit(): void {
  }

}
