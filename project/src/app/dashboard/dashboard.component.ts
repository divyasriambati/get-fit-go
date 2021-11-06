import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RoutineService } from '../services/routine/routine.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  public routineList: any[] | undefined


  constructor(private _dataService: DataService, public router: Router, public routineService: RoutineService) { }

  // public isSubscribed = this._dataService.userData.
  public routines: any

  onSelect(id: any) {
    this.router.navigate(['/dashboard', id])
  }

  ngOnInit(): void {

    this.routineList = this._dataService.userData;
    this.getRoutines();
  }
  getRoutines() {
    this.routineService.getUserRoutine().subscribe(
      (data) => {
        console.log(data);
        this.routines = data.response;
        console.log(this.routines);
        this._dataService.routineDetails = this.routines;

      }
      , (err) => {
        console.log(err);
      }
    )
  }

  unsubscribeRoutine() {
    var postObj = {
      "routineid": '',//pass routine id
      "userid": localStorage.getItem('userid')
    }
    this.routineService.unsubscribeRoutine(postObj['userid'], postObj['routineid']).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }


}
