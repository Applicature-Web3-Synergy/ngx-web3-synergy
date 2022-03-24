import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucAvatarComponent } from './avatar.component';

describe('AucAvatarComponent', () => {
  let component: AucAvatarComponent;
  let fixture: ComponentFixture<AucAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AucAvatarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
