import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlayersTable } from '../../components/players-table/players-table';
import { PlayersService } from '../../services/players.service';
import { Player } from '../../../../shared/models/player.model';
import { Router } from 'express';

@Component({
  selector: 'app-manage-players',
  standalone: true,
  imports: [PlayersTable, RouterLink],
  templateUrl: './manage-players.html',
  styleUrl: './manage-players.css',
})
export class ManagePlayers implements OnInit {
  private readonly playersService = inject(PlayersService);

  readonly players = signal<Player[]>([]);
  readonly isLoading = signal<boolean>(true);

  public playersCount: number = 0;
  public clubsCount: number = 0;

  ngOnInit(): void {
    this.fetchPlayers();
  }

  fetchPlayers(): void {
    this.isLoading.set(true);
    this.playersService.findAllWithRelations().subscribe({
      next: (players) => {
        this.players.set(players as unknown as Player[]);
        this.playersCount = players.length;
        this.clubsCount = players.reduce(
          (count, player) => count + (player.clubs ? player.clubs.length : 0),
          0,
        );
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        console.error('Error fetching players:', err);
        this.isLoading.set(false);
      },
    });
  }

}
