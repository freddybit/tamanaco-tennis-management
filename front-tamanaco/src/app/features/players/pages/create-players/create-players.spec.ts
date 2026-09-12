import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlayers } from './create-players';

describe('CreatePlayers', () => {
  let component: CreatePlayers;
  let fixture: ComponentFixture<CreatePlayers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePlayers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePlayers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
