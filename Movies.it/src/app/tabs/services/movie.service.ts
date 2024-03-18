import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  Subject,
  first,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs';
import {
  Movie,
  MovieParams,
  ResponseDto,
} from 'src/app/shared/interfaces/movie.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  refresh$ = new BehaviorSubject<boolean>(true);
  movies$ = new Observable<Movie[]>();
  queryParams: MovieParams;
  private _baseUrl = environment.baseUrl;

  set params(value: MovieParams) {
    this.queryParams = value;
    this.refresh();
  }

  constructor(private readonly _http: HttpClient) {
    this.queryParams = {
      page: 0,
      size: 20,
    };

    this.movies$ = this.refresh$.pipe(
      switchMap(() => {
        const params = this.getParams();
        return this._http.get<ResponseDto>(`${this._baseUrl}/movies`, {
          params,
        });
      }),
      map((responseMovies) => responseMovies.movies)
    );
  }

  getParams() {
    let params: HttpParams = new HttpParams();
    if (this.queryParams.title)
      params = params.set('title', this.queryParams.title);
    if (this.queryParams.orderBy)
      params = params.set('order_by', this.queryParams.orderBy);
    if (this.queryParams.page)
      params = params.set('page', this.queryParams.page);
    if (this.queryParams.size)
      params = params.set('size', this.queryParams.size);
    return params;
  }

  // getList(title: string, page: number): Observable<Movie[]> {
  //   return this._http
  //     .get<ResponseDto<Movie[]>>(
  //       `${this._baseUrl}/movies?order_by=id&page=${page}&size=25&title=${title}`
  //     )
  //     .pipe(
  //       map((result: any) => {
  //         return result.movies;
  //       })
  //     );
  // }

  getById(id: string): Observable<Movie> {
    return this._http.get<Movie>(`${this._baseUrl}/movies/${id}`);
  }

  update(updatedMovie: Movie): Observable<Movie> {
    return this._http.put<Movie>(
      `${this._baseUrl}/movies/${updatedMovie.id}`,
      updatedMovie
    );
  }

  create(createdMovie: Movie): Observable<Movie> {
    return this.movies$.pipe(
      take(1),
      switchMap((movies) => {
        let _numId = movies.length;
        const newId = `tt${(_numId + 1).toString().padStart(7, '0')}`;
        const newMovie: Movie = {
          id: newId,
          title: createdMovie.title,
          year: createdMovie.year,
          runningTime: createdMovie.runningTime,
          genres: createdMovie.genres,
          rating: {
            averageRating: 0,
            numVotes: 0,
          },
        };
        return this._http.post<Movie>(`${this._baseUrl}/movies`, newMovie);
      }),
      tap(() => this.refresh())
    );
  }

  refresh() {
    this.refresh$.next(true);
  }

  delete(id: string) {
    this._http
      .delete<Movie>(`${this._baseUrl}/movies/${id}`)
      .pipe(
        first(),
        tap(() => this.refresh())
      )
      .subscribe();
  }

  // movieTitleValidator(): AsyncValidatorFn {
  //   return (control: AbstractControl) => {
  //     return this.getList(control.value).pipe(
  //       map((exists) => {
  //         return exists? exists : null;
  //       })
  //     )
  //   }
  // }
}
