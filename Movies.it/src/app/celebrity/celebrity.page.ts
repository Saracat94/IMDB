import { Component } from '@angular/core';
import { Celebrity } from '../shared/interfaces/celebrity.interfaces';
import { CelebrityService } from '../tabs/services/celebrity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../shared/interfaces/list.interfaces';

@Component({
  selector: 'app-celebrity',
  templateUrl: 'celebrity.page.html',
  styleUrls: ['celebrity.page.scss']
})
export class CelebrityPage {

  celebrities_list: Item[] = [];
  celebritySelected: Item | undefined;

  titlePage: string = "Celebrities";

  constructor(private _celebrityService: CelebrityService,
    private readonly _router: Router,
    private route: ActivatedRoute) {}

    private _getList(){
      this._celebrityService.getList().subscribe((celebrities: Celebrity[]) => {
        this.celebrities_list = celebrities.map((celebrity: Celebrity) => {
          return {
            id: celebrity.id,
            name: celebrity.name
          };
        });
      });
    }

  ionViewWillEnter() {
    this._getList();
  }

  clickItemCreate() {
    this._router.navigate(['create'], { relativeTo: this.route });
  }
  clickItem(id: string) {
    // this.celebritySelected = this.celebrities_list.find((celebrity) => celebrity.id === id);
    this._router.navigate(['detail', id], { relativeTo: this.route });
  }

  clickItemEdit(id: string) {
    this._router.navigate(['edit', id], { relativeTo: this.route });
  }

  clickItemRemove(id: string) {
    this._celebrityService.delete(id);
  }
}
