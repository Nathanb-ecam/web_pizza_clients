import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaEditComponent } from './pizza-edit.component';

describe('PizzaEditComponent', () => {
  let component: PizzaEditComponent;
  let fixture: ComponentFixture<PizzaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
