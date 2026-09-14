import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Club } from "../models/club.model";
import { SelectOption } from "../ui/molecules/select-field/select-field";

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/clubs`;

  findAll(): Observable<Club[]> {
    return this.http.get<Club[]>(this.endpoint);
  }

  findById(clubKey: number): Observable<Club> {
    return this.http.get<Club>(`${this.endpoint}/${clubKey}`);
  }

  getOptions(): Observable<SelectOption[]> {
    return this.findAll().pipe(
      map((clubs) =>
        clubs.map((club) => ({
          label: club.clubName,
          value: club.clubKey,
        })),
      ),
    );
  }
}
