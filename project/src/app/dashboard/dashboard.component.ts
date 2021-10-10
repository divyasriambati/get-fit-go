import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 

public routines : any[] | undefined

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {

      this.routines  = this._dataService.getDetails()
  }

  
}
