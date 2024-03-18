import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../interfaces/list.interfaces';
import { MovieCelebrity } from '../../interfaces/movie.interfaces';

@Component({
  selector: 'app-links',
  templateUrl: 'links.component.html',
  styleUrls: ['links.component.scss'],
})
export class LinksComponent {
  @Input() list: MovieCelebrity[] = [];
  @Input() isMovie: boolean = true;
}
