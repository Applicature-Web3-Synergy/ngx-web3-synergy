import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleDialogsComponent } from './example-dialogs.component';

describe('ExampleDialogsComponent', () => {
  let component: ExampleDialogsComponent;
  let fixture: ComponentFixture<ExampleDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleDialogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
