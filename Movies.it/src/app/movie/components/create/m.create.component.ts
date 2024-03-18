import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Movie } from "src/app/shared/interfaces/movie.interfaces";
import { MovieService } from "src/app/tabs/services/movie.service";
import { Location } from '@angular/common';


@Component({
    selector: 'app-mcreate',
    templateUrl: 'm.create.component.html',
    styleUrls: ['m.create.component.scss']
})
export class MovieCreateComponent {
    formUser: FormGroup | undefined;
    movie: Movie[] =[];
    titlePage: string = "Movie creating"

    constructor(private _movieService: MovieService,
        private _location: Location,
        ) {
            this._createForm();
    }

    private _createForm() {
        this.formUser = new FormGroup({
            id: new FormControl("tt0076759", Validators.required),
            title: new FormControl("", {
                validators: Validators.required,
                // asyncValidators: [this._movieService.movieTitleValidator()],
                updateOn: 'blur'}),
            year: new FormControl(0, Validators.required),
            runningTime: new FormControl(0, Validators.required),
            genres: new FormControl("", Validators.required)
        });
        
    }

    submitForm() {
        console.log(this.formUser)
        if (this.formUser?.valid) {
            this._movieService.create(this.formUser?.value).subscribe((createdMovie: Movie) => {
                this._location.back();
            })
        }
    }
}