import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapValidationComponent } from './recap-validation.component';

describe('RecapValidationComponent', () => {
  let component: RecapValidationComponent;
  let fixture: ComponentFixture<RecapValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecapValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
