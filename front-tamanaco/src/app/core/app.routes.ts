import { Routes } from '@angular/router';
import { Login } from '../features/auth/pages/login/login';
import { AuthLayout } from '../shared/ui/layouts/auth-layout/auth-layout';
import { BackofficeLayout } from '../shared/ui/layouts/backoffice-layout/backoffice-layout';
import { ManagePlayers } from '../features/players/pages/manage-players/manage-players';
import { CreatePlayers } from '../features/players/pages/create-players/create-players';

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
      { path: 'players', component: ManagePlayers },
      { path: 'players/new', component: CreatePlayers },
      { path: 'players/:id', component: ManagePlayers },
      { path: 'players/:id/edit', component: CreatePlayers },
    ],
  },
];
