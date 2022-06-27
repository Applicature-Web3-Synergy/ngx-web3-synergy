import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleAvatarsComponent } from './example-avatars.component';

describe('ExampleAvatarsComponent', () => {
  let component: ExampleAvatarsComponent;
  let fixture: ComponentFixture<ExampleAvatarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleAvatarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleAvatarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
