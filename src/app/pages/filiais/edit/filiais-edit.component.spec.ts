import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliaisEditComponent } from './filiais-edit.component';

describe('FiliaisEditComponent', () => {
  let component: FiliaisEditComponent;
  let fixture: ComponentFixture<FiliaisEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiliaisEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiliaisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
