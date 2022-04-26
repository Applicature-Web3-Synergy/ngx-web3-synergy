import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAccountButtonComponent } from './basic-account-button.component';

describe('BasicAccountButtonComponent', () => {
  let component: BasicAccountButtonComponent;
  let fixture: ComponentFixture<BasicAccountButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicAccountButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicAccountButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
