import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucCopyToClipboardComponent } from './copy-to-clipboard.component';


describe('AucCopyToClipboardComponent', () => {
  let component: AucCopyToClipboardComponent;
  let fixture: ComponentFixture<AucCopyToClipboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucCopyToClipboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucCopyToClipboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
