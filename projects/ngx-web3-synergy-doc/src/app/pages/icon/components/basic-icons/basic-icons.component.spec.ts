import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicIconsComponent } from './basic-icons.component';

describe('BasicIconsComponent', () => {
  let component: BasicIconsComponent;
  let fixture: ComponentFixture<BasicIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
