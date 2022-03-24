import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucProgressBarComponent } from './progress-bar.component';

describe('AucProgressBarComponent', () => {
  let component: AucProgressBarComponent;
  let fixture: ComponentFixture<AucProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucProgressBarComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
