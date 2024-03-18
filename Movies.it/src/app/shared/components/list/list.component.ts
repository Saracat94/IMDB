import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Item } from '../../interfaces/list.interfaces';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent {
  color = ''

  @Input() isCelebrity: boolean = false;

  @Input() items_list: Item[] = [];

  @Output() clickItem = new EventEmitter<string>();
  @Output() clickItemRemove = new EventEmitter<string>();
  @Output() clickItemEdit = new EventEmitter<string>();
 

}
