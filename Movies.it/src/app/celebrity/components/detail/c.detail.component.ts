import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Celebrity } from "src/app/shared/interfaces/celebrity.interfaces";
import { CelebrityService } from "src/app/tabs/services/celebrity.service";

@Component({
    selector: 'app-cdetail',
    templateUrl: 'c.detail.component.html',
    styleUrls: ['c.detail.component.scss']
})
export class CelebrityDetailComponent {

    selectedCelebrityId: string | undefined;
    celebrity: Celebrity | undefined;
    titlePage: string = "Celebrity Detail"

    constructor(private _route: ActivatedRoute,
        private _celebrityService: CelebrityService) {
        this._route.params.subscribe(params => {
            this.selectedCelebrityId = params['id'];
            if (this.selectedCelebrityId) {
                this._celebrityService.getById(this.selectedCelebrityId).subscribe(
                    (result: Celebrity) => {
                        this.celebrity = result;
                    }
                );
            }
        });
    }

}