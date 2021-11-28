import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-routine',
  templateUrl: './add-routine.component.html',
  styleUrls: ['./add-routine.component.css']
})
export class AddRoutineComponent implements OnInit {

  constructor(
    public router: Router,
    private fb: FormBuilder,
  ) { }

 

 

  routineForm = this.fb.group({
    routineDesigner: [''],
    routineName: [''],
    duration: [''],
    description: [''],
    routineStructure:this.fb.array([]),
    youtubeVideos: this.fb.array([]),
    
  });
  routineStructure = this.routineForm.get("routineStructure") as FormArray;

  addSubTask(){
    const group = new FormGroup({
      subTask: new FormControl(''),
      duration: new FormControl('')
    });

    this.routineStructure.push(group);
  }
 
  ngOnInit(): void {
  }

}
