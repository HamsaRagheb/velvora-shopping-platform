import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniWishlistComponent } from './mini-wishlist.component';

describe('MiniWishlistComponent', () => {
  let component: MiniWishlistComponent;
  let fixture: ComponentFixture<MiniWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiniWishlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
