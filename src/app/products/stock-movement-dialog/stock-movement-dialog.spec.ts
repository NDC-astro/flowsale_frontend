import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementDialog } from './stock-movement-dialog';

describe('StockMovementDialog', () => {
  let component: StockMovementDialog;
  let fixture: ComponentFixture<StockMovementDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockMovementDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockMovementDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
