import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersTable } from './players-table';

describe('PlayersTable', () => {
  let component: PlayersTable;
  let fixture: ComponentFixture<PlayersTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
