import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../environment/environment";
import { Ranking } from "../models/ranking.model";
import { TennisCategory } from "../models/tennis-category.model";
import { SelectOption } from "../ui/molecules/select-field/select-field";

@Injectable({
  providedIn: 'root',
})
export class TennisCategoriesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  // --- Rankings ---
  getRankings(): Observable<Ranking[]> {
    return this.http.get<Ranking[]>(`${this.baseUrl}/ranking`);
  }

  getRankingOptions(): Observable<SelectOption[]> {
    return this.getRankings().pipe(
      map((rankings) =>
        rankings.map((r) => ({
          label: r.name,
          value: r.rankingKey,
        })),
      ),
    );
  }

  // --- Categorías de Tenis ---
  getCategories(rankingKey?: number | null): Observable<TennisCategory[]> {
    let params = new HttpParams();
    if (rankingKey !== undefined && rankingKey !== null) {
      params = params.set('rankingKey', rankingKey.toString());
    }

    return this.http.get<TennisCategory[]>(`${this.baseUrl}/tennis-categories`, { params });
  }

  getCategoryOptions(rankingKey?: number | null): Observable<SelectOption[]> {
    return this.getCategories(rankingKey).pipe(
      map((categories) =>
        categories.map((c) => ({
          label: c.categoryName,
          value: c.catKey,
        })),
      ),
    );
  }
}
