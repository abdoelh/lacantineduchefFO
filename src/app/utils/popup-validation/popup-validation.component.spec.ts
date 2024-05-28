import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupValidationComponent } from './popup-validation.component';

describe('PopupValidationComponent', () => {
  let component: PopupValidationComponent;
  let fixture: ComponentFixture<PopupValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
