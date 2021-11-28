import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { RoutineService } from '../services/routine/routine.service';
import { UserService1 } from '../services/user/user.service';
import { Router } from '@angular/router';
import { CommentsService } from '../services/comments/comments.service';

@Component({
  selector: 'app-routine-details',
  templateUrl: './routine-details.component.html',
  styleUrls: ['./routine-details.component.css']
})
export class RoutineDetailsComponent implements OnInit {


  public routineId: any

  public routineDetailsList: any
  public isDataLoaded = false;
  public userId: any;
  constructor(public _dataService: DataService, public route: ActivatedRoute, private routineService: RoutineService, public router: Router, public commentService: CommentsService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userid');
    this.userId = this.userId.substring(1, this.userId.length - 1)
    this.routineId = this.route.snapshot.paramMap.get('id');
    this.routineService.getRoutineDetails(this.routineId).subscribe(
      (data) => {
        this.routineDetailsList = data.response;
        this.isDataLoaded = true;
        this.loadComments(data.response);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  checkeligibility() {
    let userid: any = localStorage.getItem('userid');
    userid = userid.substring(1, userid.length - 1);
    return (this.routineDetailsList['userids'].indexOf(userid) == -1 ? true : false);
  }
  subscribeRoutine(id: any) {
    var postObj = {
      'userid': localStorage.getItem('userid'),
      'routineid': id//pass routine id
    }
    this.routineService.subscribeRoutine(postObj).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      }
      , (err) => {
        console.log(err);
      }
    )
  }
  unsubscribeRoutine(routineid: any) {
    var postObj = {
      "routineid": routineid,//pass routine id
      "userid": localStorage.getItem('userid')
    }
    this.routineService.unsubscribeRoutine(postObj['userid'], postObj['routineid']).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  editRoutine(routineid: any) {
    this.router.navigate(['/routine/edit', routineid])
  }
  deleteRoutine(id: any) {
    this.routineService.deleteRoutine(id).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  public allComments: any = [];
  async loadComments(routineObj: any) {
    for (let id of routineObj['commentids']) {
      this.allComments.push(await this.getComment(id));
      console.log("*****comments****", this.allComments);
    }
  }
  updatecomment(commentid: any, description: any) {
    var postObj = {
      "commentid": commentid,
      "description": description
    }
    this.commentService.updateComment(postObj).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  public currComment: any
  createComment() {
    var postObj = {
      "userid": localStorage.getItem('userid'),
      "routineid": this.routineId,
      "description": this.currComment,//pass the comment
    }
    
    this.commentService.createComment(postObj).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  deleteComment(commnetId: any) {
    this.commentService.deleteComment(this.routineId, commnetId).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  getComment(commentid: any) {
    return new Promise((resolve, reject) => {
      this.commentService.getComment(commentid).subscribe(
        (data) => {
          resolve(data.response);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }
}
