import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Place } from '../models/place.model';
import { SelectOption } from '../ui/molecules/select-field/select-field';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/place`;

  findAll(): Observable<Place[]> {
    return this.http.get<Place[]>(this.endpoint);
  }

  findByParent(parentKey: number): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.endpoint}/parent/${parentKey}`);
  }


  getOptionsByParent(parentKey: number): Observable<SelectOption[]> {
    return this.findByParent(parentKey).pipe(
      map((places) =>
        places.map((place) => ({
          label: place.name,
          value: place.placeKey,
        })),
      ),
    );
  }

  // Opciones directas desde el findAll (filtrando países con parentKey null en frontend si es necesario)
  getAllOptions(): Observable<SelectOption[]> {
    return this.findAll().pipe(
      map((places) =>
        places.map((place) => ({
          label: place.name,
          value: place.placeKey,
        })),
      ),
    );
  }
}
