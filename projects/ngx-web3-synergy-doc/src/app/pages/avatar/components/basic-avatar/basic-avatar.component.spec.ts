import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAvatarComponent } from './basic-avatar.component';

describe('BasicAvatarComponent', () => {
  let component: BasicAvatarComponent;
  let fixture: ComponentFixture<BasicAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
