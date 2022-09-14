import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOfContentComponent } from './table-of-contents.component';

describe('AnchorsComponent', () => {
  let component: TableOfContentComponent;
  let fixture: ComponentFixture<TableOfContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOfContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOfContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
