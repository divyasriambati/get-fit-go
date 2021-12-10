import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RoutineService } from '../services/routine/routine.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserService1 } from '../services/user/user.service';
import { SearchPageService } from '../services/search-page/search-page.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


export interface User {
  name: string;
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})

export class SearchPageComponent implements OnInit {



  public routines: any[] | undefined
  public friendsData: any[] | undefined
  public filterTerm: any;
  public peopleSearchText: any;
  public routineSearchText: any;

  constructor(private userService: UserService1, public _dataService: DataService, public router: Router, public route: ActivatedRoute,
    public routineService: RoutineService, public searchService: SearchPageService, private http: HttpClient) {
    this.getLocations();
    this.getPosition().then((resp) => {
      
    })
  }

  public isTrue = false;
  public isRoutine = false;
  public friendId: any;
  public friendFilter: any;
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


  routineFilter() {
    this.searchService.routineFilter = this.routineSearchText
  }
  peopleFilter() {
    console.log(this.peopleSearchText)
    this.searchService.peopleFilter = this.peopleSearchText
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

  checkEligibility(routineObj: any) {
    return routineObj['userids'].indexOf(JSON.stringify(localStorage.get('userid')));
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

  public friendRoutines: any[] | undefined
  public friendName: any
  public friendDescription: any
  public friendData: any
  generateRoutineDetailsOfUser(userObj: any) {
    var arr = []
    console.log(userObj)
    for (let id of userObj['routineids'])
      arr.push(this.getRoutineDetails(id));
    Promise.all(arr).then((resp) => {
      console.log("current user routines", resp);
      this.friendData = resp
      console.log(this.friendData);

      this.friendRoutines = resp
      this.friendName = userObj.firstname
      this.friendDescription = userObj.description
      this.isTrue = true

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


  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  private _filter(value: string): string[] {
    console.log(value)
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  // search-by-location functions

  getLocations() {
    this.searchService.getLocations().subscribe(
      (data) => {
        console.log("locations data", data.response);
        this.filteredOptions = data.response
        // this.filteredOptions = this.myControl.valueChanges.pipe(
        //   startWith(''),
        //   map(value => this._filter(value)),
        // );
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getRoutinesByLocation() {
    var postObj = {
      "userid": localStorage.getItem('userid'),
      "location": ""//pass location
    }
    this.searchService.getRoutinesOfLocation(postObj).subscribe(
      (data) => {
        console.log("location wise routines", data);
      },
      (err) => {
        console.log(err)
      }
    )
  }
  getYouTubeVideos(type: any) {
    this.http.get<any>("https://www.googleapis.com/youtube/v3/search?key=" + "AIzaSyD8eppFMvF0mBZj2d6wXewiQ_05VMLox7A" +
      "&type=video&part=snippet&maxResults=" + 10 + "&q=" + type).subscribe((data) => {
        console.log("youtube api data")
        console.log(data);
      },
        (err) => {
          console.log(err)
        });
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });

  }

}
