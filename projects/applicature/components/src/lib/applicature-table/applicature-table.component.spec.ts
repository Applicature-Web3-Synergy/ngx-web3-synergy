import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicatureTableComponent } from './applicature-table.component';

describe('ApplicatureTableComponent', () => {
  let component: ApplicatureTableComponent;
  let fixture: ComponentFixture<ApplicatureTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicatureTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicatureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
