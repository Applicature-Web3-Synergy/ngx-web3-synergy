import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCopyToClipboardComponent } from './basic-copy-to-clipboard.component';

describe('BasicCopyToClipboardComponent', () => {
  let component: BasicCopyToClipboardComponent;
  let fixture: ComponentFixture<BasicCopyToClipboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicCopyToClipboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicCopyToClipboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
