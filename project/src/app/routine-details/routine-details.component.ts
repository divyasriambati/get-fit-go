import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { RoutineService } from '../services/routine/routine.service';
import { UserService1 } from '../services/user/user.service';
import { Router } from '@angular/router';

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
  constructor(public _dataService: DataService, public route: ActivatedRoute, private routineService: RoutineService, public router: Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userid');
    this.userId = this.userId.substring(1, this.userId.length - 1)
    this.routineId = this.route.snapshot.paramMap.get('id');
    this.routineService.getRoutineDetails(this.routineId).subscribe(
      (data) => {
        this.routineDetailsList = data.response;
        this.isDataLoaded = true;
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

}
