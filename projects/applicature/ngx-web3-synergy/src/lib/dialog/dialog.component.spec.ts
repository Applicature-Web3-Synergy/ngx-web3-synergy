import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sDialogComponent } from './dialog.component';

describe('W3sDialogComponent', () => {
  let component: W3sDialogComponent;
  let fixture: ComponentFixture<W3sDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sDialogComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
