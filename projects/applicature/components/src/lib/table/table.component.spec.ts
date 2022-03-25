import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucTableComponent } from './table.component';

describe('AucTableComponent', () => {
  let component: AucTableComponent;
  let fixture: ComponentFixture<AucTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
