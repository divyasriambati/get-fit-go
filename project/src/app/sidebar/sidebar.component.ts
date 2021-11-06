import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RoutineService } from '../services/routine/routine.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public suggestions: any[] | undefined

  constructor(public _dataService: DataService, private routineService: RoutineService) { }



  ngOnInit(): void {
    this.routineService.getRoutineSuggestions().subscribe(
      (data) => {
        console.log("user suggestions", data.response);
      }
      , (err) => {
        console.log(err);
      }
    )
  }

}
