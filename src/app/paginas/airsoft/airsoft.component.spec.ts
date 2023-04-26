import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirsoftClienteComponent } from './airsoft.component';

describe('AirsoftClienteComponent', () => {
  let component: AirsoftClienteComponent;
  let fixture: ComponentFixture<AirsoftClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirsoftClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirsoftClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
