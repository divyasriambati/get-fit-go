import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { update_user_details, get_user_details } from '../../config/serverurls';
@Injectable({
  providedIn: 'root'
})
export class UserService1 {

  constructor(private http: HttpClient) { }
  updateUserDetails(data: any) {
    return this.http.put<any>(update_user_details, data);
  }
  public getUserDetails() {
    return this.http.get<any>(get_user_details + '/' + localStorage.getItem('userid'));
  }
}
