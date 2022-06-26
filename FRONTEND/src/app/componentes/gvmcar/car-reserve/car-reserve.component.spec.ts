import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarReserveComponent } from './car-reserve.component';

describe('CarReserveComponent', () => {
  let component: CarReserveComponent;
  let fixture: ComponentFixture<CarReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarReserveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
