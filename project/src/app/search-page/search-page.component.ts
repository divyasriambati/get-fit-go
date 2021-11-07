import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RoutineService } from '../services/routine/routine.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserService1 } from '../services/user/user.service';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  public routines: any[] | undefined
  public friendsData: any[] | undefined
  public filterTerm: any;

  constructor(private userService: UserService1,public _dataService: DataService, public router: Router, public route: ActivatedRoute, public routineService: RoutineService) { }

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
    this.getFriends();

  }
  getRoutines() {
    this.routineService.getRoutineSuggestions().subscribe(
      (data) => {
        this.allRoutines = data['response']
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

  public allFriends: any[] | undefined
  getFriends() {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log("***********user suggestion*********\n", data.response);
        this.generateRoutineDetailsOfUser(data.response[0]);
        this.allFriends = data.response;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  generateRoutineDetailsOfUser(userObj: any) {
    var arr = []
    for (let id of userObj['routineids'])
      arr.push(this.getRoutineDetails(id));
    Promise.all(arr).then((resp) => {
      console.log("current user routines", resp);
    }).catch((err) => {
      console.log(err)
    })
  }




  getRoutineDetails(routineid: any) {
    return new Promise((resolve, reject) => {
      this.routineService.getRoutineDetails(routineid).subscribe(
        (data) => {
          resolve(data.response);
        },
        (err) => {
          console.log(err);
        }
      )
    })
  }

}
