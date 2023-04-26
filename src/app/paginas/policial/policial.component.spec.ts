import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicialClienteComponent } from './policial.component';

describe('PolicialClienteComponent', () => {
  let component: PolicialClienteComponent;
  let fixture: ComponentFixture<PolicialClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicialClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicialClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
