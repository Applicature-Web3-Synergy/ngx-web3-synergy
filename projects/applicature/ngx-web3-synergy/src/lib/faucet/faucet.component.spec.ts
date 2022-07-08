import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sFaucetComponent } from './faucet.component';

describe('W3sFaucetComponent', () => {
  let component: W3sFaucetComponent;
  let fixture: ComponentFixture<W3sFaucetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sFaucetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sFaucetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
