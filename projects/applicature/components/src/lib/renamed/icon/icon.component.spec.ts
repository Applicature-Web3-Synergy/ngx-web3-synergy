import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucIconComponent } from './icon.component';

describe('AucIconComponent', () => {
  let component: AucIconComponent;
  let fixture: ComponentFixture<AucIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
