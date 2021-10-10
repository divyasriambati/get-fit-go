import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

public users = [
  {"username" : "Divyasri" , "email" : "divya123@gmail.com", "password": "divya@123"},
  {"username" : "balaji" , "email" : "balajibalu@gmail.com", "password": "coder@123"},
  {"username" : "sudarshan badireddi" , "email" : "sudarshan@gmail.com", "password": "sudarshan@123"}
]

  constructor() { }
}
