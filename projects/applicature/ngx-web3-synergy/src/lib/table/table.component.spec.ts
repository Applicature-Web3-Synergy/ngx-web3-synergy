import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sTableComponent } from './table.component';

describe('W3sTableComponent', () => {
  let component: W3sTableComponent;
  let fixture: ComponentFixture<W3sTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
