import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialBlockchainComponent } from './historial-blockchain.component';

describe('HistorialBlockchainComponent', () => {
  let component: HistorialBlockchainComponent;
  let fixture: ComponentFixture<HistorialBlockchainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialBlockchainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialBlockchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
