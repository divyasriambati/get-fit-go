import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _userdata : UserService , public router : Router) { }

  public userForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    
  });

  public alreadyUser = false

  signup(){
    
    let result = false
    for(let index=0; index< this._userdata.users.length;index++){
        if(this.userForm.value.username == this._userdata.users[index]['username'] &&
        this.userForm.value.email == this._userdata.users[index]['email'] && 
        this.userForm.value.password == this._userdata.users[index]['password'])
        {
          result = true
        }
    }

  if(result ){
    this.alreadyUser =true
  }
  else{
    this._userdata.users.push(this.userForm.value)
    this.router.navigate(['/dashboard'])
  }

  }

  ngOnInit(): void {
  }

}
