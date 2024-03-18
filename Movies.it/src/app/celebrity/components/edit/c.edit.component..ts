import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Celebrity } from "src/app/shared/interfaces/celebrity.interfaces";
import { CelebrityService } from "src/app/tabs/services/celebrity.service";
import { Location } from '@angular/common';


@Component({
    selector: 'app-cedit',
    templateUrl: 'c.edit.component.html',
    styleUrls: ['c.edit.component.scss']
})
export class CelebrityEditComponent{

    selectedCelebrityId: string | undefined;
    celebrity: Celebrity | undefined;
    formUser: FormGroup | undefined;
    titlePage: string = "Celebrity editing"

    constructor(private _route: ActivatedRoute,
        private _celebrityService: CelebrityService,
        private _location: Location) {
        this._route.params.subscribe(params => {
            this.selectedCelebrityId = params['id'];
            if (this.selectedCelebrityId) {
                this._celebrityService.getById(this.selectedCelebrityId).subscribe(
                    (result: Celebrity) => {
                        this.celebrity = result;
                        this._setForm();
                    }
                );
            }
        });
    }

    private _setForm() {
        this.formUser = new FormGroup({
            id: new FormControl(this.celebrity?.id, Validators.required),
            name: new FormControl(this.celebrity?.name, Validators.required),
            birthYear: new FormControl(this.celebrity?.birthYear, Validators.required),
            deathYear: new FormControl(this.celebrity?.deathYear)
        });
    }
    submitForm() {
        console.log(this.formUser)
        if(this.formUser?.valid){
            this._celebrityService.update(this.formUser?.value).subscribe((updatedCelebrity: Celebrity) => {
                this._location.back();
            });
        }
    }
    
}