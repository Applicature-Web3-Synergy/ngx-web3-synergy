import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sCopyToClipboardComponent } from './copy-to-clipboard.component';


xdescribe('W3sCopyToClipboardComponent', () => {
  let component: W3sCopyToClipboardComponent;
  let fixture: ComponentFixture<W3sCopyToClipboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sCopyToClipboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sCopyToClipboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
