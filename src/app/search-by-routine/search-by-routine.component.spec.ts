import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByRoutineComponent } from './search-by-routine.component';

describe('SearchByRoutineComponent', () => {
  let component: SearchByRoutineComponent;
  let fixture: ComponentFixture<SearchByRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
