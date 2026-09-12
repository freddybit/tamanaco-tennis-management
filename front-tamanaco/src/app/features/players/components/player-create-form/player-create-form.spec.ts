import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCreateForm } from './player-create-form';

describe('PlayerCreateForm', () => {
  let component: PlayerCreateForm;
  let fixture: ComponentFixture<PlayerCreateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCreateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerCreateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
