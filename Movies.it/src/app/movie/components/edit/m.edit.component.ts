import { Component, Input } from '@angular/core';
import { Movie } from '../../../shared/interfaces/movie.interfaces';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/tabs/services/movie.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
    selector: 'app-medit',
    templateUrl: 'm.edit.component.html',
    styleUrls: ['m.edit.component.scss'],
})
export class MovieEditComponent {

    selectedMovieId: string | undefined;
    movie: Movie | undefined;
    formUser: FormGroup | undefined;
    titlePage: string = "Movie Editing"

    constructor(private _route: ActivatedRoute,
        private _movieService: MovieService,
        private _location: Location) {
        this._route.params.subscribe(params => {
            this.selectedMovieId = params['id'];
            if (this.selectedMovieId) {
                this._movieService.getById(this.selectedMovieId).subscribe((results: Movie) => {
                    this.movie = results;
                    this._setForm();
                });
            }
        });
    }

    private _setForm() {
        this.formUser = new FormGroup({
            id: new FormControl(this.movie?.id, Validators.required),
            title: new FormControl(this.movie?.title, Validators.required),
            year: new FormControl(this.movie?.year, Validators.required),
            runningTime: new FormControl(this.movie?.runningTime, Validators.required),
            genres: new FormControl(this.movie?.genres, Validators.required)
        });
        // this.formUser.valueChanges.subscribe((x) => console.log(x));
    }

    submitForm() {
        console.log(this.formUser)
        if (this.formUser?.valid) {
            this._movieService.update(this.formUser?.value).subscribe((updatedMovie: Movie) =>{
                this._location.back();
            });
        }
    }
}
