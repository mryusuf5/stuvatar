import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleComponent } from './idle.component';

describe('IdleComponent', () => {
  let component: IdleComponent;
  let fixture: ComponentFixture<IdleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdleComponent]
    });
    fixture = TestBed.createComponent(IdleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
