import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetCodeSectionComponent } from './reset-code-section.component';

describe('ResetCodeSectionComponent', () => {
  let component: ResetCodeSectionComponent;
  let fixture: ComponentFixture<ResetCodeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetCodeSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetCodeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
