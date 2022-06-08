import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleFaucetComponent } from './example-faucet.component';

describe('ExampleFaucetComponent', () => {
  let component: ExampleFaucetComponent;
  let fixture: ComponentFixture<ExampleFaucetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleFaucetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleFaucetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
