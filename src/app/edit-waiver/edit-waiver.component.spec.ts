import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWaiverComponent } from './edit-waiver.component';

describe('EditWaiverComponent', () => {
  let component: EditWaiverComponent;
  let fixture: ComponentFixture<EditWaiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWaiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWaiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
