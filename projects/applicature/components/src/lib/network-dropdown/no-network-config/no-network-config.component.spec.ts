import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucNoNetworkConfigComponent } from './no-network-config.component';

describe('AucNoNetworkConfigComponent', () => {
  let component: AucNoNetworkConfigComponent;
  let fixture: ComponentFixture<AucNoNetworkConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucNoNetworkConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucNoNetworkConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
