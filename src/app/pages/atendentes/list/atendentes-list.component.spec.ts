import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendentesListComponent } from './atendentes-list.component';

describe('AtendentesListComponent', () => {
  let component: AtendentesListComponent;
  let fixture: ComponentFixture<AtendentesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendentesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendentesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
