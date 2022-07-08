import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sProgressBarComponent } from './progress-bar.component';

describe('W3sProgressBarComponent', () => {
  let component: W3sProgressBarComponent;
  let fixture: ComponentFixture<W3sProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sProgressBarComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
