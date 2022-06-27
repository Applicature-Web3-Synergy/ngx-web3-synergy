import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleInputsComponent } from './example-inputs.component';

describe('ExampleInputsComponent', () => {
  let component: ExampleInputsComponent;
  let fixture: ComponentFixture<ExampleInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
