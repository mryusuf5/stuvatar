import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemComponent } from './inventory-item.component';

describe('InventoryItemComponent', () => {
  let component: InventoryItemComponent;
  let fixture: ComponentFixture<InventoryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryItemComponent]
    });
    fixture = TestBed.createComponent(InventoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
