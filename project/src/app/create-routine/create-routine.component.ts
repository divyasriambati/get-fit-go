import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RoutineService } from '../services/routine/routine.service';
@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.css']
})
export class CreateRoutineComponent implements OnInit {

  constructor(private routineService: RoutineService) { }

  ngOnInit(): void {
  }
  routineForm: any = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    duration: new FormControl(),
    sbt1: new FormControl(),
    sbd1: new FormControl(),
    sbt2: new FormControl(),
    sbd2: new FormControl(),
    sbt3: new FormControl(),
    sbd3: new FormControl(),
    rft1: new FormControl(),
    rfl1: new FormControl(),
    rft2: new FormControl(),
    rfl2: new FormControl(),
    rft3: new FormControl(),
    rfl3: new FormControl(),
  })
  subtasks() {
    return new FormGroup({
      title: new FormControl(),
      duration1: new FormControl()
    })
  }
  references() {
    return new FormGroup({
      title: new FormControl(),
      link: new FormControl()
    })
  }
  addSubTask() {
    const control = <FormArray>this.routineForm['value'].get('subtasks');
    control.push(this.subtasks())
  }
  addSubReference() {
    const control = <FormArray>this.routineForm['value'].get('references');
    control.push(this.references())
  }
  getSubtasks(form: any) {
    return form.controls.subtasks.controls;
  }
  getReferences(form: any) {
    return form.controls.references.controls;
  }
  submit() {
    var postObj = {
      "title": this.routineForm['value']['title'],
      "description": this.routineForm['value']['description'],
      "duration": this.routineForm['value']['duration'],
      "subtasks": [
        {
          "title": this.routineForm['value']['sbt1'],
          "duration": this.routineForm['value']['sbd1']
        },
        {
          "title": this.routineForm['value']['sbt2'],
          "duration": this.routineForm['value']['sbd2']
        },   
        { 
          "title": this.routineForm['value']['sbt2'],
          "duration": this.routineForm['value']['sbd2']
        }
      ],
      references: [
        {
          "title": this.routineForm['value']['rft1'],
          "link": this.routineForm['value']['rfl1']
        },
        {
          "title": this.routineForm['value']['rft2'],
          "link": this.routineForm['value']['rfl1']
        },
        {
          "title": this.routineForm['value']['rft3'],
          "link": this.routineForm['value']['rfl1']
        }
      ],
      creatorid: localStorage.getItem('userid')
    }
    this.routineService.createRoutine(postObj).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  public updateRoutine() {
    var postObj = {
      "title": this.routineForm['value']['title'],
      "description": this.routineForm['value']['description'],
      "duration": this.routineForm['value']['duration'],
      "subtasks": [
        {
          "title": this.routineForm['value']['sbt1'],
          "duration": this.routineForm['value']['sbd1']
        },
        {
          "title": this.routineForm['value']['sbt2'],
          "duration": this.routineForm['value']['sbd2']
        },
        {
          "title": this.routineForm['value']['sbt2'],
          "duration": this.routineForm['value']['sbd2']
        }
      ],
      references: [
        {
          "title": this.routineForm['value']['rft1'],
          "link": this.routineForm['value']['rfl1']
        },
        {
          "title": this.routineForm['value']['rft2'],
          "link": this.routineForm['value']['rfl1']
        },
        {
          "title": this.routineForm['value']['rft3'],
          "link": this.routineForm['value']['rfl1']
        }
      ],
      creatorid: localStorage.getItem('userid')
    }
    this.routineService.updateRoutine(postObj).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
