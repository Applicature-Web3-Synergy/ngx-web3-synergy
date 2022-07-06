import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucFaucetComponent } from './faucet.component';

describe('AucFaucetComponent', () => {
  let component: AucFaucetComponent;
  let fixture: ComponentFixture<AucFaucetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucFaucetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucFaucetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
