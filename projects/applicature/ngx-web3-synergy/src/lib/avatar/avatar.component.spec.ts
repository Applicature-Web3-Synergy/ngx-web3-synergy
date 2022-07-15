import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sAvatarComponent } from './avatar.component';

xdescribe('W3sAvatarComponent', () => {
  let component: W3sAvatarComponent;
  let fixture: ComponentFixture<W3sAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [W3sAvatarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
