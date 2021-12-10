import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { search_get_locations, location_get_routines } from '../../config/serverurls'

@Injectable({
  providedIn: 'root'
})
export class SearchPageService {

  constructor(private http: HttpClient) { }
  public peopleFilter = "";
  public routineFilter = "";
  public getLocations() {
    return this.http.get<any>(search_get_locations);
  }
  public getRoutinesOfLocation(data: any) {
    return this.http.post<any>(location_get_routines, data);
  }
}
