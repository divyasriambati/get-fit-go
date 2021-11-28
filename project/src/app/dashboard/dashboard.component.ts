import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RoutineService } from '../services/routine/routine.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserService } from '../user.service';
import { NgImageSliderComponent } from 'ng-image-slider';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  public minDate: Date = new Date ("10/31/2021");
    public maxDate: Date = new Date ("12/04/2021");
    public value: Date = new Date ("11/08/2021");
    
    
  public routineList: any[] | undefined
  public filterTerm: any;
  public user:String='';

  @ViewChild('nav') slider: NgImageSliderComponent | any;
  imageObject: Array<object> = [{
    video: 'https://youtu.be/6pxRHBw-k8M', // Youtube url
    title: 'Image title'
},
{
  video: 'assets/video/movie.mp4', // MP4 Video url
  title: 'Image title'
},

];
prevImageClick() {
  this.slider.prev();
}

nextImageClick() {
  this.slider.next();
}



  constructor(private _userService: UserService,private _dataService: DataService, public router: Router, public routineService: RoutineService,public dialog: MatDialog) {
   }

   openDialog(){
     this.dialog.open(PopUpComponent);
   }

  // public isSubscribed = this._dataService.userData.
  public routines: any
  public isDataLoaded = false;


  
  onSelect(id: any) {
    this.router.navigate(['/dashboard', id]);
  }

  ngOnInit(): void {

    this.routineList = this._dataService.userData;
    this.getRoutines();
  }
  getRoutines() {
    this.routineService.getUserRoutine().subscribe(
      (data) => {
        this.routines = data.response;
        console.log("data", data);
        this.isDataLoaded = true;
        this._dataService.routineDetails = this.routines;

      }
      , (err) => {
        console.log(err);
      }
    )
  }

  unsubscribeRoutine(routineid: any, index: any) {
    var postObj = {
      "routineid": routineid,//pass routine id
      "userid": localStorage.getItem('userid')
    }
    this.routines.splice(this.routines.indexOf(index), 1);
    this.routineService.unsubscribeRoutine(postObj['userid'], postObj['routineid']).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  getUserid() {
    let userid: any = localStorage.getItem('userid');
    return (userid.substring(1, userid.length - 1))
  }
  deleteRoutine(id: any, index: any) {
    this.routines.splice(this.routines.indexOf(index), 1);
    this.routineService.deleteRoutine(id).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
