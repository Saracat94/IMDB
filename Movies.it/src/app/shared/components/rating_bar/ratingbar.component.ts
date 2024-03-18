import { Component, Input, OnChanges, OnInit } from "@angular/core";

@Component({
    selector: 'app-ratingbar',
    templateUrl: 'ratingbar.component.html',
    styleUrls: ['ratingbar.component.scss'],
  })
  export class RatingBarComponent implements OnChanges {
    @Input() value!: number;

    ngOnChanges() {
      this.progressColor(this.value);
    }
    
    progressColor(value: number){
      if(value >= 8){
        return 'primary';
      } else if (value > 4 && value < 8){
        return  'secondary';
      } else {
        return  'danger';
      }
    }
  }