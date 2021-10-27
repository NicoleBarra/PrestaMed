import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductsEditComponent } from './my-products-edit.component';

describe('MyProductsEditComponent', () => {
  let component: MyProductsEditComponent;
  let fixture: ComponentFixture<MyProductsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProductsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProductsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
