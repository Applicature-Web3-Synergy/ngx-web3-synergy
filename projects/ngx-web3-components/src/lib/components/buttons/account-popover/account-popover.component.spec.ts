import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPopoverComponent } from './account-popover.component';

describe('AccountPopoverComponent', () => {
  let component: AccountPopoverComponent;
  let fixture: ComponentFixture<AccountPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
