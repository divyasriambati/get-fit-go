import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RoutineService } from '../services/routine/routine.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.css']
})
export class CreateRoutineComponent implements OnInit {

  constructor(private routineService: RoutineService, private router: Router, public route: ActivatedRoute) { }
  public isEdit = false;
  public routineId:any
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
  });
  loadForm(data: any) {
    this.routineForm.patchValue({
      title: data.title,
      description: data.description,
      duration: data.duration,
      sbt1: data.subtasks[0].title,
      sbd1: data.subtasks[0].duration,
      rft1: data.references[0].title,
      rfl1: data.references[0].link
    });
    if (data.subtasks.length > 1) {
      this.routineForm.patchValue({
        sbt2: data.subtasks[1].title,
        sbd2: data.subtasks[1].duration
      })
    }
    if (data.subtasks.length > 2) {
      this.routineForm.patchValue({
        sbt3: data.subtasks[2].title,
        sbd3: data.subtasks[2].duration
      })
    }
    if (data.references.length > 1) {
      this.routineForm.patchValue({
        rft2: data.references[1].title,
        rfl2: data.references[1].link
      })
    }
    if (data.references.length > 2) {
      this.routineForm.patchValue({
        rft3: data.references[2].title,
        rfl3: data.references[2].link
      })
    }

  }
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
        this.router.navigate(['/dashboard']);

      },
      (err) => {
        console.log(err);
      }
    )
  }
  public updateRoutine() {
    var postObj = {
      "routineid":this.routineId,
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
          "link": this.routineForm['value']['rfl2']
        },
        {
          "title": this.routineForm['value']['rft3'],
          "link": this.routineForm['value']['rfl3']
        }
      ],
      creatorid: localStorage.getItem('userid')
    }
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
