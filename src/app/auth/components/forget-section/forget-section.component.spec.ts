import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetSectionComponent } from './forget-section.component';

describe('ForgetSectionComponent', () => {
  let component: ForgetSectionComponent;
  let fixture: ComponentFixture<ForgetSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgetSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
