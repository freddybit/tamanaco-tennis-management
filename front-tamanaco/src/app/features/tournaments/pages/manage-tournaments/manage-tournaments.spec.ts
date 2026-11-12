import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTournaments } from './manage-tournaments';

describe('ManageTournaments', () => {
  let component: ManageTournaments;
  let fixture: ComponentFixture<ManageTournaments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTournaments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTournaments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
