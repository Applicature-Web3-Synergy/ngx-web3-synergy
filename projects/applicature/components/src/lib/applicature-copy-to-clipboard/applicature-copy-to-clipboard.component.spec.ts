import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicatureCopyToClipboardComponent } from './applicature-copy-to-clipboard.component';

describe('ApplicatureCopyToClipboardComponent', () => {
  let component: ApplicatureCopyToClipboardComponent;
  let fixture: ComponentFixture<ApplicatureCopyToClipboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicatureCopyToClipboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicatureCopyToClipboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
