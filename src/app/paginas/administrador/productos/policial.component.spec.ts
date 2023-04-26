import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicialAdminComponent } from './policial.component';

describe('PolicialAdminComponent', () => {
  let component: PolicialAdminComponent;
  let fixture: ComponentFixture<PolicialAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicialAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicialAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
