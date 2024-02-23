import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofrontendhostComponent } from './microfrontendhost.component';

describe('MicrofrontendhostComponent', () => {
  let component: MicrofrontendhostComponent;
  let fixture: ComponentFixture<MicrofrontendhostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MicrofrontendhostComponent]
    });
    fixture = TestBed.createComponent(MicrofrontendhostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
