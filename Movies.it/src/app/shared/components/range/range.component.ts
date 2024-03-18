import { Component, EventEmitter, Output } from "@angular/core";
import { RangeCustomEvent, RangeValue } from "@ionic/core";


@Component({
    selector: 'app-range',
    templateUrl: 'range.component.html',
    styleUrls: ['range.component.scss'],
  })
  export class RangeComponent {
   @Output() lastEmittedValue: RangeValue | undefined;

    ratingChange(ev: Event) {
      this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    }

  }