import { Injectable } from '@angular/core';
import { get_user_routines, get_routine_suggestions, subscribe_routine } from '../../config/serverurls';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  constructor(private http: HttpClient) { }
  public getUserRoutine() {
    return this.http.post<any>(get_user_routines , {userid:localStorage.getItem('userid')});
  }
  public getRoutineSuggestions() {
    return this.http.get<any>(get_routine_suggestions + '/' + localStorage.getItem('userid'));
  }
  public subscribeRoutine(userData: any) {
    return this.http.post<any>(subscribe_routine, userData);
  }
}
