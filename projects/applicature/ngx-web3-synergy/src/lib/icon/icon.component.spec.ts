import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sIconComponent } from './icon.component';

describe('W3sIconComponent', () => {
  let component: W3sIconComponent;
  let fixture: ComponentFixture<W3sIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
