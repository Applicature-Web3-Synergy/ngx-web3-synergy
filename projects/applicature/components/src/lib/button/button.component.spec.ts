import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucButtonComponent } from './button.component';

describe('AucIdenticonDirective', () => {
  let component: AucButtonComponent;
  let fixture: ComponentFixture<AucButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
