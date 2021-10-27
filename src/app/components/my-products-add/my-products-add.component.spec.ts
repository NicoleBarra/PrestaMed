import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductsAddComponent } from './my-products-add.component';

describe('MyProductsAddComponent', () => {
  let component: MyProductsAddComponent;
  let fixture: ComponentFixture<MyProductsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProductsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProductsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
