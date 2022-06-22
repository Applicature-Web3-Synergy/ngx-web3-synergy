import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucConnectModalComponent } from './connect-modal.component';

describe('AucConnectModalComponent', () => {
  let component: AucConnectModalComponent;
  let fixture: ComponentFixture<AucConnectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucConnectModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucConnectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
