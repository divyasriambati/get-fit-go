import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getDetails(){
    return[
        
      {
        "id": 1,
      "name":"Full Body Workout",
      "duration" : "30",
      "routine-structure" : 
        [
          {"activity" : "warmup" , "time" : 5},
          {"activity" : "suryanamaskara" , "time" : 20},
          {"activity" : "padmasadana" , "time" : 40},
          {"activity" : "meditation" , "time" : 15},
        ],
        "youtubeVideos" : ["https://www.youtube.com/watch?v=IKzkc3FWx7g" , "https://www.youtube.com/watch?v=4EBswVUU3po"],
      "progress":60,
      "description" : "Routine description ",
       "subscribers" : 100 ,
       "coverPic" : ""



      },

      {
        "id": 1,
      "name":"Full Body Workout",
      "duration" : "30",
      "routine-structure" : 
        [
          {"activity" : "warmup" , "time" : 5},
          {"activity" : "suryanamaskara" , "time" : 20},
          {"activity" : "padmasadana" , "time" : 40},
          {"activity" : "meditation" , "time" : 15},
        ],
        "youtubeVideos" : ["https://www.youtube.com/watch?v=IKzkc3FWx7g" , "https://www.youtube.com/watch?v=4EBswVUU3po"],
      "progress":60,
      "description" : "Routine description ",
       "subscribers" : 100 ,
       "coverPic" : ""



      },

      
    ];
  }
}
