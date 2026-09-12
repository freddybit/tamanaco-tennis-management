import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPlayer } from './details-player';

describe('DetailsPlayer', () => {
  let component: DetailsPlayer;
  let fixture: ComponentFixture<DetailsPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPlayer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
