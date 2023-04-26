import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirsoftAdminComponent } from './airsoft.component';

describe('AirsoftAdminComponent', () => {
  let component: AirsoftAdminComponent;
  let fixture: ComponentFixture<AirsoftAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirsoftAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirsoftAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
