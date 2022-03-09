import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicatureDialogComponent } from './applicature-dialog.component';

describe('ApplicatureDialogComponent', () => {
  let component: ApplicatureDialogComponent;
  let fixture: ComponentFixture<ApplicatureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicatureDialogComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicatureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
