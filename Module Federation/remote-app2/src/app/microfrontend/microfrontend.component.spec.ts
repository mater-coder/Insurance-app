import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofrontendComponent } from './microfrontend.component';

describe('MicrofrontendComponent', () => {
  let component: MicrofrontendComponent;
  let fixture: ComponentFixture<MicrofrontendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MicrofrontendComponent]
    });
    fixture = TestBed.createComponent(MicrofrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
