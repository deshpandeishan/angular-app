import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFood } from './delete-food';

describe('DeleteFood', () => {
  let component: DeleteFood;
  let fixture: ComponentFixture<DeleteFood>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteFood]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFood);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
