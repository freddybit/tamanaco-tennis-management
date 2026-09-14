import { Component, inject, input, signal } from '@angular/core';
import { Player } from '../../../../shared/models/player.model';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-details-player',
  imports: [],
  templateUrl: './details-player.html',
  styleUrl: './details-player.css',
})
export class DetailsPlayer {
  playerService = inject(PlayersService);
  readonly id = input.required<string>();
  readonly player = signal<Player | null>(null);

  ngOnInit(): void {
    const statePlayer = history.state?.player as Player | undefined;

    if (statePlayer) {
      this.player.set(statePlayer);
    } else {
      this.playerService.findById(Number(this.id())).subscribe({
        next: (data) => this.player.set(data as unknown as Player),
        error: (err) => console.error('Error al cargar detalle del jugador:', err),
      });
    }
  }
}
