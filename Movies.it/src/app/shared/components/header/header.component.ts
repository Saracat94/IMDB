import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RangeCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent {
  @Input() title = '';
  @Input() showAdd = false;
  @Input() showBack = true;
  @Input() showRange = false;
  @Input() showOrderTo = false;
  @Input() showSearchbar = false;

  @Output() addEvent = new EventEmitter<void>();
  @Output() searchInput = new EventEmitter<string>();
  @Output() orderRating = new EventEmitter<string>();
  @Output() ratingRange = new EventEmitter<number>();
  

  formSearch;

  constructor() {
    this.formSearch = new FormGroup({
      research: new FormControl('', { nonNullable: true }),
    });

    this.formSearch
      .get('research')
      ?.valueChanges.subscribe((inputValue: string) => {
        console.log(inputValue);

        this.searchInput.emit(inputValue);
      });
  }
  orderChange(event: Event) {
    this.orderRating.emit((event as CustomEvent).detail.value)
  }

  ratingChange(event: Event) {
    this.ratingRange.emit((event as CustomEvent).detail.value);
  }

  clickItemCreate() {
    this.addEvent.emit();
  }
  
}
