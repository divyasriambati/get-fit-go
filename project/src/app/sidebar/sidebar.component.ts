import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RoutineService } from '../services/routine/routine.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public suggestions: any[] | undefined

  constructor(public router: Router,public _dataService: DataService, private routineService: RoutineService) { }

onSelect(id:any){
  window.location.replace(`http://localhost:4200/routine-details/${id}`)
}

  ngOnInit(): void {
    this.routineService.getRoutineSuggestions().subscribe(
      (data) => {
        this.suggestions = data.response;
      }
      , (err) => {
        console.log(err);
      }
    )
  }

}
