import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { Item } from '../shared/interfaces/list.interfaces';
import { Movie } from '../shared/interfaces/movie.interfaces';
import { MovieService } from '../tabs/services/movie.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-movie',
  templateUrl: 'movie.page.html',
  styleUrls: ['movie.page.scss'],
})
export class MoviePage {
  movieSelected: Item | undefined;
  movie_list: Item[] = [];
  fullMovieList: Item[] = [];
  rating$ = new BehaviorSubject<number>(0);
  search$ = new BehaviorSubject<string>('');
  orderTo: string = '';
  titlePage: string = 'Movie';

  constructor(
    private _movieService: MovieService,
    private readonly _router: Router,
    private route: ActivatedRoute
  ) {
    this._movieService.movies$.subscribe((movies) => {
      this.fullMovieList = movies.map((movie) => {
        return {
          id: movie.id,
          name: movie.title,
          rating: (movie.rating?.averageRating || 0) / 10,
          cast: movie.cast,
          year: movie.year,
        };
      });
      return this.movie_list = this.fullMovieList;
    });

    this.search$.subscribe((title) => {
      this._movieService.params = {
        ...this._movieService.queryParams,
        title: title,
      };
    });

    this.rating$.subscribe((rating) => {
      return this.movie_list = this.fullMovieList.filter(
        (movie) => (movie.rating || 0) > rating / 10
      );
    });
  }



  private generateItems() {
    let _page = 0;
    _page++;
    this._movieService.params = {
      ...this._movieService.queryParams,
      page: _page,
    };
  
    this._movieService.movies$.subscribe((movies) => {
      const mappedMovies = movies.map((movie) => {
        return {
          id: movie.id,
          name: movie.title,
          rating: (movie.rating?.averageRating || 0) / 10,
          cast: movie.cast,
          year: movie.year,
        };
      });
  
      this.fullMovieList = this.fullMovieList.concat(mappedMovies);
      this.movie_list = this.fullMovieList;
    });
  }
  

  onIonInfinite(ev: Event) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  searchInput(inputValue: string) {
    this.search$.next(inputValue);
  }

  ratingRange(rating: number) {
    this.rating$.next(rating);
  }

  clickItemCreate() {
    this._router.navigate(['create'], { relativeTo: this.route });
  }

  clickItem(id: string) {
    this.movieSelected = this.movie_list.find((movie) => movie.id === id);
    // this._router.navigate(['detail', id], { relativeTo: this.route });
  }

  clickItemEdit(id: string) {
    this._router.navigate(['edit', id], { relativeTo: this.route });
  }

  clickItemRemove(id: string) {
    this._movieService.delete(id);
  }

  sortByRating(order: string) {
    return (this.orderTo = order);
  }

}
