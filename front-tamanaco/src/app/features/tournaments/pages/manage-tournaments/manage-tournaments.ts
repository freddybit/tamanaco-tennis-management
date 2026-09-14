import { Component } from '@angular/core';

@Component({
  selector: 'manage-tournaments',
  imports: [],
  templateUrl: './manage-tournaments.html',
  styleUrl: './manage-tournaments.css',
})
export class ManageTournaments {

  readonly tournaments = [
    {
      id: 1,
      name: 'Torneo 1',
      description: 'Descripción del torneo 1',
    },
    {
      id: 2,
      name: 'Torneo 2',
      description: 'Descripción del torneo 2',
    },
  ];

}
