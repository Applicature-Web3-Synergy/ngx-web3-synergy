import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sTransactionsListComponent } from './transactions-list.component';

describe('W3sTransactionsListComponent', () => {
  let component: W3sTransactionsListComponent;
  let fixture: ComponentFixture<W3sTransactionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sTransactionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sTransactionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
