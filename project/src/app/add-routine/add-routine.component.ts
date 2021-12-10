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
  
  items: FormArray | undefined;

  constructor(
    public router: Router,
    private fb: FormBuilder,
  ) { }

 

 

  routineForm = this.fb.group({
    routineDesigner: [''],
    routineName: [''],
    duration: [''],
    description: [''],
    aliases: this.fb.array([
      this.fb.control('')
    ]),
    skills :this.fb.array([
      this.fb.group({
        name: this.fb.control(''),
        level: this.fb.control('')
      })
    ]),
    items: this.fb.array([ this.createItem() ])
    // routineStructure:this.fb.array([]),
    // youtubeVideos: this.fb.array([]),
    
  });

  createItem(): FormGroup {
    return this.fb.group({
      name: '',
      description: '',
      price: ''
    });
  }

  addItem(): void {
    this.items = this.routineForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }
  
  get userFormGroups () {
    return this.routineForm.get('items') as FormArray
  }

  get aliases() {
    return this.routineForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  get skills() {
    return this.routineForm.get('skills') as FormArray;
  }

  addskills() {
    this.aliases.push(this.fb.group([]));
  }

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
