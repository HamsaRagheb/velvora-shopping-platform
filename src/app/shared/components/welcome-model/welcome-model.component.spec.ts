import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeModelComponent } from './welcome-model.component';

describe('WelcomeModelComponent', () => {
  let component: WelcomeModelComponent;
  let fixture: ComponentFixture<WelcomeModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
