import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerCreateForm } from '../../components/player-create-form/player-create-form';
import { PlayersService } from '../../services/players.service';
import { CreatePlayerPayload } from '../../../../shared/models/player.model';

@Component({
  selector: 'app-create-players',
  standalone: true,
  imports: [PlayerCreateForm],
  templateUrl: './create-players.html',
  styleUrl: './create-players.css',
})
export class CreatePlayers {
  private readonly router = inject(Router);
  private readonly playersService = inject(PlayersService);

  readonly isSaving = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  handlePlayerSubmit(payload: CreatePlayerPayload): void {
    this.isSaving.set(true);
    this.errorMessage.set(null);

    const body: CreatePlayerPayload = {
      ...payload,
      tennisCategoriesKeys: payload.tennisCategoriesKeys ?? [],
      clubsKeys: payload.clubsKeys
        ? payload.clubsKeys.filter((id): id is number => id !== null)
        : [],
    };

    this.playersService.create(body).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.router.navigate(['/backoffice/players']);
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(
          err.error?.message || 'Error al registrar el jugador en la base de datos.',
        );
      },
    });
  }

  handleCancel(): void {
    this.router.navigate(['/backoffice/players']);
  }
}
