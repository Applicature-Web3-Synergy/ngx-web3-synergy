import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoNetworkConfigComponent } from './no-network-config.component';

describe('NoNetworkConfigComponent', () => {
  let component: NoNetworkConfigComponent;
  let fixture: ComponentFixture<NoNetworkConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoNetworkConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoNetworkConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
