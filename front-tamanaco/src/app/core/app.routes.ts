import { Routes } from '@angular/router';
import { Login } from '../features/auth/pages/login/login';
import { AuthLayout } from '../shared/ui/layouts/auth-layout/auth-layout';
import { BackofficeLayout } from '../shared/ui/layouts/backoffice-layout/backoffice-layout';
import { ManagePlayers } from '../features/players/pages/manage-players/manage-players';
import { CreatePlayers } from '../features/players/pages/create-players/create-players';
import { DetailsPlayer } from '../features/players/pages/details-player/details-player';
import { ManageTournaments } from '../features/tournaments/pages/manage-tournaments/manage-tournaments';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthLayout,
    children: [{ path: 'login', component: Login }],
  },
  {
    path: 'backoffice',
    component: BackofficeLayout,
    children: [
      // Players routes
      { path: 'players', component: ManagePlayers },
      { path: 'players/new', component: CreatePlayers },
      { path: 'players/:id', component: DetailsPlayer },
      { path: 'players/:id/edit', component: CreatePlayers },
      // Tournaments routes
      { path: 'tournaments', component: ManageTournaments },
      { path: 'tournaments/new', component: CreatePlayers },
    ],
  },
];
