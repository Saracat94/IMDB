import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../shared/interfaces/movie.interfaces';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/tabs/services/movie.service';



@Component({
    selector: 'app-mdetail',
    templateUrl: 'm.detail.component.html',
    styleUrls: ['m.detail.component.scss'],
})
export class MovieDetailComponent {

    selectedMovieId: string | undefined;
    movie: Movie | undefined;
    titlePage: string = "Movie Detail"

    constructor(private _route: ActivatedRoute,
        private _movieService: MovieService) {
        this._route.params.subscribe(params => {
            this.selectedMovieId = params['id'];
            if (this.selectedMovieId) {
                this._movieService.getById(this.selectedMovieId).subscribe((result: Movie) => {
                    this.movie = result;
                })
            }
        });

    }
}