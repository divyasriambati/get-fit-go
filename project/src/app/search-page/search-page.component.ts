import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  public routines : any[] | undefined
  public friendsData : any[] | undefined

  
  constructor(public _dataService: DataService,public router : Router,public route : ActivatedRoute) { }

  public isTrue = false;
  public isRoutine = false;
  public friendId: any

  friendDetails(friend: any){
    this.isTrue = true
    console.log(friend);
    // this.router.navigate(['/friendData' , friend])
    window.location.replace(`http://localhost:4200/friendData/${friend}`)
  }

  ngOnInit(): void {

    this.routines  = this._dataService.userData
    this.friendsData  = this._dataService.friendsDetails
    if(this.router.url != "/search-page")
    {
    this. friendId =this.route.snapshot.paramMap.get('id');

    this.friendId = this.friendId - 1
    this.isTrue=true
    }
    // else{
      
    // }

    console.log(this.friendId);
    
    


  }

}
