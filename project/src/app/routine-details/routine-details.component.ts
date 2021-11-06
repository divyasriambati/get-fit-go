import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-routine-details',
  templateUrl: './routine-details.component.html',
  styleUrls: ['./routine-details.component.css']
})
export class RoutineDetailsComponent implements OnInit {

  public routineList : any[] | undefined

  public routineId: any

  public routineDetailsList :any[] | undefined
 


  constructor(public _dataService: DataService ,public route : ActivatedRoute) { }

  ngOnInit(): void {

    this.routineList  = this._dataService.userData
    
    this. routineId = this.route.snapshot.paramMap.get('id');

    // this.routineId = this.routineId-1


    this.routineDetailsList = this._dataService.routineDetails
    console.log(this.routineDetailsList);
    
  }

  

 
  

  Subscribe(){

  }

}
