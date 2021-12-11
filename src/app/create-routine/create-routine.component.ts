import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, FormArray , Validators } from '@angular/forms';
import { RoutineService } from '../services/routine/routine.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.css']
})
export class CreateRoutineComponent implements OnInit {
  routineStructure: FormArray | any;
  youtubeVideos: FormArray | any;


  constructor(private routineService: RoutineService, private router: Router, private fb: FormBuilder, public route: ActivatedRoute) { }
  public isEdit = false;
  public routineId: any
  ngOnInit(): void {
    if (this.router.url.indexOf('/edit') != -1) {
      this.isEdit = true;
      this.routineId = this.route.snapshot.paramMap.get('id');
      this.routineService.getRoutineDetails(this.routineId).subscribe(
        (data) => {
          console.log(data)
          this.loadForm(data['response']);

        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

  routineForm1 = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    duration: [''],
    routineStructure: this.fb.array([this.addingTask()]),
    youtubeVideos: this.fb.array([this.addYoutubeLink()]),
    location: ['']

  });

  

  // loadData(){
  //   this.routineForm1.patchValue({
  //     title: ['fjgdfh'],
  //     description: ['frg fgdfgfdh uytr'],
  //     duration: ['30'],
  //   location: ['Vizag']
  //   })

  // }
 

  addingTask(): FormGroup {
    return this.fb.group({
      title: '',
      duration: ''
    });
  }
  addTask(): void {
    this.routineStructure = this.routineForm1.get('routineStructure') as FormArray;
    this.routineStructure.push(this.addingTask());
  }

  get routineStructureFormGroups() {
    return this.routineForm1.get('routineStructure') as FormArray
  }

  addYoutubeLink(): FormGroup {
    return this.fb.group({
      title: '',
      link: ''
    });
  }
  addLink(): void {
    this.youtubeVideos = this.routineForm1.get('youtubeVideos') as FormArray;
    this.youtubeVideos.push(this.addYoutubeLink());
  }

  get youtubeLinksFormGroups() {
    return this.routineForm1.get('youtubeVideos') as FormArray
  }

  
  
  submit() {
    console.log(this.routineForm1.value);
    var postObj = {
      title: this.routineForm1.value.title,
      description: this.routineForm1.value.description,
      subtasks: this.routineForm1.value.routineStructure,
      references: this.routineForm1.value.youtubeVideos,
      location: this.routineForm1.value.location,
      creatorid: localStorage.getItem('userid')
    }
    console.log(postObj)
    this.routineService.createRoutine(postObj).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  loadForm(formData :any){
    this.routineForm1.patchValue({
      title : formData['title'],
      description : formData['description'],
      location : formData['location']
    })
   
    for(let task in formData.subtasks){
     const control=<FormArray>this.routineForm1.get('routineStructure')
     control.push(this.addingTask())
    
    }
    var remove : any=<FormArray>this.routineForm1.get('routineStructure')
    remove.removeAt(remove.length -1)
    console.log(this.routineForm1.value, formData);
    
    // this.routineForm1.patchValue({
    //   routineStructure : formData['subtasks']
    // })
    console.log(this.routineForm1.value);
    
    for(let task in formData.references){
      const control=<FormArray>this.routineForm1.get('youtubeVideos')
      control.push(this.addYoutubeLink())
     
     }
     var remove : any=<FormArray>this.routineForm1.get('youtubeVideos')
     remove.removeAt(remove.length -1)
     console.log(this.routineForm1.value, formData);
     
     this.routineForm1.patchValue({
      youtubeVideos : formData['references'],
      routineStructure : formData['subtasks']

     })
    
    
  }

  public updateRoutine() {

    var postObj = {
      title: this.routineForm1.value.title,
      description: this.routineForm1.value.description,
      subtasks: this.routineForm1.value.routineStructure,
      references: this.routineForm1.value.youtubeVideos,
      location: this.routineForm1.value.location,
      routineid : this.routineId, 
      creatorid: localStorage.getItem('userid')
    }

  console.log(this.routineForm1.value);
  
    this.routineService.updateRoutine(postObj).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
