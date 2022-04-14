import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedIconsComponent } from './customized-icons.component';

describe('CustomizedIconsComponent', () => {
  let component: CustomizedIconsComponent;
  let fixture: ComponentFixture<CustomizedIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizedIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
