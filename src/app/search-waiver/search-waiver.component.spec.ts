import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWaiverComponent } from './search-waiver.component';

describe('SearchWaiverComponent', () => {
  let component: SearchWaiverComponent;
  let fixture: ComponentFixture<SearchWaiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWaiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWaiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
