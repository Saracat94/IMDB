import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../interfaces/list.interfaces';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.scss'],
})
export class FooterComponent {
  @Input() itemDetail: Item | undefined;

  constructor(private _router: Router, private _route: ActivatedRoute) {}

  seeDetail(id: string) {
    this._router.navigate(['detail', id], { relativeTo: this._route });
  }
}
