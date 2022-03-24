import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucInputComponent } from './input.component';

describe('AucInputComponent', () => {
  let component: AucInputComponent;
  let fixture: ComponentFixture<AucInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AucInputComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
