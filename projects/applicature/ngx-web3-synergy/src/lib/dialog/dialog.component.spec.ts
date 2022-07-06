import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucDialogComponent } from './dialog.component';

describe('AucDialogComponent', () => {
  let component: AucDialogComponent;
  let fixture: ComponentFixture<AucDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucDialogComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
