import { Injectable } from '@angular/core';
import { get_comment, update_comment, delete_comment, create_comment } from '../../config/serverurls';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }
  public getComment(commentid: any) {
  
    return this.http.get<any>(get_comment + '/' + commentid);
  }
  public updateComment(postObj: any) {
    return this.http.put<any>(update_comment, postObj);
  }
  public deleteComment(routineid: any, commentid: any) {
    return this.http.delete<any>(delete_comment + '/' + routineid + '/' + commentid);
  }
  public createComment(postObj: any) {
    return this.http.post<any>(create_comment, postObj);
  }
}
