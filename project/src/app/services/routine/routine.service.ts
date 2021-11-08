import { Injectable } from '@angular/core';
import { get_user_routines, get_routine_suggestions, subscribe_routine, get_routine_details, unsubscribe_routine, create_routine, update_routine, delete_routine } from '../../config/serverurls';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  constructor(private http: HttpClient) { }
  public getUserRoutine() {
    return this.http.post<any>(get_user_routines, { userid: localStorage.getItem('userid') });
  }
  public getRoutineSuggestions() {
    return this.http.get<any>(get_routine_suggestions + '/' + localStorage.getItem('userid'));
  }
  public subscribeRoutine(userData: any) {
    return this.http.post<any>(subscribe_routine, userData);
  }
  public unsubscribeRoutine(userid: any, routineid: any) {
    return this.http.delete<any>(unsubscribe_routine + '/' + userid + '/' + routineid);
  }
  public getRoutineDetails(routineId: any) {
    return this.http.get<any>(get_routine_details + '/' + routineId);
  }
  public createRoutine(data: any) {
    return this.http.post<any>(create_routine, data);
  }
  public updateRoutine(data: any) {
    return this.http.put<any>(update_routine, data);
  }
  public deleteRoutine(id: any) {
    return this.http.delete<any>(delete_routine + '/' + id);
  }
}
