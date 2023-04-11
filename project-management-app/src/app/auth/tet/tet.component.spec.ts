import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TetComponent } from './tet.component';

describe('TetComponent', () => {
  let component: TetComponent;
  let fixture: ComponentFixture<TetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
