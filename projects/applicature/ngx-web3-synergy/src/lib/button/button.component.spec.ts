/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsColors, AS_COLOR_GROUP } from '@applicature/styles';

import { W3sButtonComponent } from './button.component';
import { ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { W3sIconModule } from '../icon';
import { W3sDirectivesModule, W3sSetStyleProp } from '../directives';
import { W3SpinnerModule } from '../spinner';

const mockElementRef: any = {
  nativeElement: {
    style: {
      width: ''
    }
  }
};

describe('W3sButtonComponent', () => {
  let component: W3sButtonComponent;
  let fixture: ComponentFixture<W3sButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sButtonComponent ],
      providers: [
        { provide: ElementRef, useValue: mockElementRef }
      ],
      imports: [
        CommonModule,
        W3sIconModule,
        W3sDirectivesModule,
        W3SpinnerModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create.', () => {
    expect(component).toBeTruthy();
  });

  it('should return icon color if color schema is not white.', () => {
    component.color = AS_COLOR_GROUP.RED;
    const expectedResult = AsColors[AS_COLOR_GROUP.WHITE].base;

    const actualResult = component.iconColor;

    expect(actualResult).toEqual(expectedResult);
  });

  it('should return icon color if color schema is white.', () => {
    component.color = AS_COLOR_GROUP.WHITE;
    const expectedResult = AsColors[AS_COLOR_GROUP.GRAY].base;

    const actualResult = component.iconColor;

    expect(actualResult).toEqual(expectedResult);
  });

  it('should return spinner color if color schema is not white.', () => {
    component.color = AS_COLOR_GROUP.RED;
    const expectedResult = AsColors[AS_COLOR_GROUP.WHITE].base;

    const actualResult = component.spinnerColor;

    expect(actualResult).toEqual(expectedResult);
  });

  it('should return spinner color if color schema is white.', () => {
    component.color = AS_COLOR_GROUP.WHITE;
    const expectedResult = AsColors[AS_COLOR_GROUP.BLUE].base;

    const actualResult = component.spinnerColor;

    expect(actualResult).toEqual(expectedResult);
  });

  describe('Class names.', () => {
    it('should return default class names object.', () => {
      const expectedResult = {
        'w3s-button': true,
        'w3s-button-white': false,
        'w3s-button-disabled': component.disabled,
        'w3s-button-adaptive': component.adaptive,
        'w3s-button-transparent': false,
        'w3s-button-bordered': component.bordered,
        [`w3s-button-${component.appearance}`]: true,
      };

      const actualResult = component.classNames;

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return class names object if transparent and bordered.', () => {
      component.transparent = true;
      component.bordered = true;
      const expectedResult = {
        'w3s-button': true,
        'w3s-button-white': false,
        'w3s-button-disabled': component.disabled,
        'w3s-button-adaptive': component.adaptive,
        'w3s-button-transparent': false,
        'w3s-button-bordered': component.bordered,
        [`w3s-button-${component.appearance}`]: true,
      };

      const actualResult = component.classNames;

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return class names object if transparent and not bordered.', () => {
      component.transparent = true;
      component.bordered = false;
      const expectedResult = {
        'w3s-button': true,
        'w3s-button-white': false,
        'w3s-button-disabled': component.disabled,
        'w3s-button-adaptive': component.adaptive,
        'w3s-button-transparent': true,
        'w3s-button-bordered': component.bordered,
        [`w3s-button-${component.appearance}`]: true,
      };

      const actualResult = component.classNames;

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return class names object if color is white.', () => {
      component.transparent = false;
      component.bordered = false;
      component.color = AS_COLOR_GROUP.WHITE;
      const expectedResult = {
        'w3s-button': true,
        'w3s-button-white': true,
        'w3s-button-disabled': component.disabled,
        'w3s-button-adaptive': component.adaptive,
        'w3s-button-transparent': false,
        'w3s-button-bordered': component.bordered,
        [`w3s-button-${component.appearance}`]: true,
      };

      const actualResult = component.classNames;

      expect(actualResult).toEqual(expectedResult);
    });

  });

  describe('Lifecycle Hooks.', () => {
    let setPropertiesSpy: jasmine.Spy<any>;

    beforeEach(() => {
      setPropertiesSpy = spyOn<any>(component, 'setProperties');
    });

    it('should call setProperties when ngOnInit.', () => {
      component.ngOnInit();

      expect(setPropertiesSpy).toHaveBeenCalledTimes(1);
    });

    it('should call setProperties when ngOnChanges.', () => {
      component.ngOnChanges();

      expect(setPropertiesSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Click on Button.', () => {
    let buttonClickedSpy: jasmine.Spy<any>;

    beforeEach(() => {
      buttonClickedSpy = spyOn(component.buttonClicked, 'emit');
    });

    it('should emit event when clicked.', () => {
      component.disabled = false;
      const expectedResult = 'some event';

      component.clicked(expectedResult);

      expect(buttonClickedSpy).toHaveBeenCalledWith(expectedResult);
    });

    it(`shouldn't emit event when clicked.`, () => {
      component.disabled = true;

      component.clicked('some event');

      expect(buttonClickedSpy).not.toHaveBeenCalled();
    });
  });

  describe('Set properties.', () => {
    it(`shouldn't set full width.`, () => {
      component.adaptive = false;
      const expectedResult = mockElementRef.nativeElement.style.width.toString();

      component.ngOnInit();

      expect(component['_elRef'].nativeElement.style.width).toEqual(expectedResult);
    });

    it('should set full width.', () => {
      component.adaptive = true;
      const expectedResult = '100%';

      component.ngOnInit();

      expect(component['_elRef'].nativeElement.style.width).toEqual(expectedResult);
    });

    it(`shouldn't set color as white.`, () => {
      component.transparent = true;
      component.color = AS_COLOR_GROUP.WHITE;
      const expectedResult = AS_COLOR_GROUP.WHITE;

      component.ngOnInit();

      expect(component.color).toEqual(expectedResult);
    });

    it(`shouldn't set color as white if not transparent`, () => {
      component.transparent = false;
      component.color = AS_COLOR_GROUP.BLUE;
      const expectedResult = AS_COLOR_GROUP.BLUE;

      component.ngOnInit();

      expect(component.color).toEqual(expectedResult);
    });

    it(`should set color as white`, () => {
      component.transparent = true;
      component.color = AS_COLOR_GROUP.BLUE;
      const expectedResult = AS_COLOR_GROUP.WHITE;

      component.ngOnInit();

      expect(component.color).toEqual(expectedResult);
    });

    it(`should set styleProperties`, () => {
      component.color = AS_COLOR_GROUP.RED;
      const expectedResult: W3sSetStyleProp[] = [
        {
          name: '--w3s-button-radius',
          value: '8px'
        },
        {
          name: '--w3s-button-base',
          value: '#E84142'
        },
        {
          name: '--w3s-button-hover',
          value: '#EA5C5E'
        },
        {
          name: '--w3s-button-light',
          value: '#F0898B'
        },
        {
          name: '--w3s-button-dark',
          value: '#C03B3C'
        },
        {
          name: '--w3s-button-text',
          value: '#FFFFFF'
        },
        {
          name: '--w3s-button-border',
          value: '#E84142'
        },
        {
          name: '--w3s-button-borderHover',
          value: '#EA5C5E'
        },
        {
          name: '--w3s-button-borderFocus',
          value: '#C03B3C'
        }
      ];

      component.ngOnInit();

      expect(component.styleProperties).toEqual(expectedResult);
    });

    it(`should set styleProperties if no color.`, () => {
      component.color = null;
      component.borderRadius = 12;
      const expectedResult: W3sSetStyleProp[] = [
        {
          name: '--w3s-button-radius',
          value: '12px'
        },
        {
          name: '--w3s-button-base',
          value: '#4678F0'
        },
        {
          name: '--w3s-button-hover',
          value: '#608BF2'
        },
        {
          name: '--w3s-button-light',
          value: '#8CABF6'
        },
        {
          name: '--w3s-button-dark',
          value: '#3F67C7'
        },
        {
          name: '--w3s-button-text',
          value: '#FFFFFF'
        },
        {
          name: '--w3s-button-border',
          value: '#4678F0'
        },
        {
          name: '--w3s-button-borderHover',
          value: '#608BF2'
        },
        {
          name: '--w3s-button-borderFocus',
          value: '#3F67C7'
        }
      ];

      component.ngOnInit();

      expect(component.styleProperties).toEqual(expectedResult);
    });
  });

});
