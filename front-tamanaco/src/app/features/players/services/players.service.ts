import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { CreatePlayerPayload, Player } from "../../../shared/models/player.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/players`;

  create(newPlayer: CreatePlayerPayload): Observable<Player> {
    return this.http.post<Player>(this.endpoint, newPlayer);
  }

  findAll(): Observable<Player[]> {
    return this.http.get<Player[]>(this.endpoint);
  }

  findAllWithRelations(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.endpoint}/details`);
  }

  findById(profileKey: number): Observable<Player> {
    return this.http.get<Player>(`${this.endpoint}/${profileKey}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}

