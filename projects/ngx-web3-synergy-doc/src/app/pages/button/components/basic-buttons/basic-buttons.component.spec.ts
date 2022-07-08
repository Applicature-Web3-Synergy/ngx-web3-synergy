import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicButtonsComponent } from './basic-buttons.component';

describe('BasicButtonsComponent', () => {
  let component: BasicButtonsComponent;
  let fixture: ComponentFixture<BasicButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
