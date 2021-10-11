import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

public users = [
  {"firstname" : "Divyasri" , "email" : "divya123@gmail.com", "password": "divya@123","lastname":"ambati","pic":"","phoneno":"","dob":"","gender":"Female"},
  {"firstname" : "balaji" , "email" : "balajibalu@gmail.com", "password": "coder@123","lastname":"puvvada","pic":"","phoneno":"","dob":"","gender":"Male"},
  {"firstname" : "sudarshan" , "email" : "sudarshan@gmail.com", "password": "sudarshan@123","lastname":"badireddi","pic":"","phoneno":"","dob":"","gender":"Male"}
]

currentuser  ='';

  constructor() { }
}
