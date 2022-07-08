import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicFaucetComponent } from './basic-faucet.component';

describe('BasicFaucetComponent', () => {
  let component: BasicFaucetComponent;
  let fixture: ComponentFixture<BasicFaucetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicFaucetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicFaucetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
