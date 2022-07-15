/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sOverlayComponent } from './overlay.component';


xdescribe('W3sOverlayComponent', () => {
  let component: W3sOverlayComponent;
  let fixture: ComponentFixture<W3sOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit action', () => {
    const emitEventSpy = spyOn<any>(component.overlayClicked, 'emit');

    component.onOverlayClicked();

    expect(emitEventSpy).toHaveBeenCalled();
  });
});
