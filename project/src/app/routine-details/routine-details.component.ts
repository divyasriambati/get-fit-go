import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { RoutineService } from '../services/routine/routine.service';
import { UserService1 } from '../services/user/user.service';
@Component({
  selector: 'app-routine-details',
  templateUrl: './routine-details.component.html',
  styleUrls: ['./routine-details.component.css']
})
export class RoutineDetailsComponent implements OnInit {


  public routineId: any

  public routineDetailsList: any
  constructor(public _dataService: DataService, public route: ActivatedRoute, private routineService: RoutineService) { }

  ngOnInit(): void {
    this.routineId = this.route.snapshot.paramMap.get('id');
    this.routineService.getRoutineDetails(this.routineId).subscribe(
      (data) => {
        this.routineDetailsList = data.response;
      },
      (err) => {
        console.log(err);
      }
    )
  }
  
}
