import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RoutineService } from '../services/routine/routine.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  public routines: any[] | undefined
  public friendsData: any[] | undefined
  public filterTerm: any;

  constructor(public _dataService: DataService, public router: Router, public route: ActivatedRoute, public routineService: RoutineService) { }

  public isTrue = false;
  public isRoutine = false;
  public friendId: any

  public allRoutines: any[] | undefined



  onSelect(id: any) {
    this.router.navigate(['/routine-details', id])
  }



  friendDetails(friend: any) {
    this.isTrue = true
    console.log(friend);
    // this.router.navigate(['/friendData' , friend])
    window.location.replace(`http://localhost:4200/friendData/${friend}`)
  }


  ngOnInit(): void {



    this.routines = this._dataService.userData
    this.friendsData = this._dataService.friendsDetails

    if (this.router.url != "/search-page") {
      this.friendId = this.route.snapshot.paramMap.get('id');

      this.friendId = this.friendId - 1
      this.isTrue = true
    }
    this.getRoutines();
  }
  getRoutines() {
    this.routineService.getRoutineSuggestions().subscribe(
      (data) => {
        console.log(data);
      }
      , (err) => {
        console.log(err);
      }
    )
  }

  subscribeRoutine() {
    var postObj = {
      'userid': JSON.stringify(localStorage.get('userid')),
      'routineid': ''//pass routine id
    }
    this.routineService.subscribeRoutine(postObj).subscribe(
      (data) => {
        console.log(data);
      }
      , (err) => {
        console.log(err);
      }
    )
  }


}
