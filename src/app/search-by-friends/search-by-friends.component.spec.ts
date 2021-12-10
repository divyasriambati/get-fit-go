import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByFriendsComponent } from './search-by-friends.component';

describe('SearchByFriendsComponent', () => {
  let component: SearchByFriendsComponent;
  let fixture: ComponentFixture<SearchByFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByFriendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
