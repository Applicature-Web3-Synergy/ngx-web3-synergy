import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sConnectModalComponent } from './connect-modal.component';

describe('W3sConnectModalComponent', () => {
  let component: W3sConnectModalComponent;
  let fixture: ComponentFixture<W3sConnectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sConnectModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sConnectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
