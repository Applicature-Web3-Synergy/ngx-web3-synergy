import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucTransactionsListComponent } from './transactions-list.component';

describe('AucTransactionsListComponent', () => {
  let component: AucTransactionsListComponent;
  let fixture: ComponentFixture<AucTransactionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucTransactionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucTransactionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
