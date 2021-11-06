import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { update_user_details } from '../../config/serverurls';
@Injectable({
  providedIn: 'root'
})
export class UserService1 {

  constructor(private http: HttpClient) { }
  updateUserDetails(data: any) {
   return  this.http.post<any>(update_user_details, data);
  }
}
