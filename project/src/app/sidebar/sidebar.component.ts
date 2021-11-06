import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public suggestions :any[] | undefined

  constructor(public _dataService: DataService ) { }



  ngOnInit(): void {

    this.suggestions = this._dataService.recommendations
    console.log(this._dataService.recommendations);

  }

}
