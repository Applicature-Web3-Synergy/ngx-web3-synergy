import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WclTableComponent } from './wcl-table.component';

describe('WclTableComponent', () => {
  let component: WclTableComponent;
  let fixture: ComponentFixture<WclTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WclTableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WclTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
