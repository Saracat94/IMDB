import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RatingBarComponent } from './ratingbar.component';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [RatingBarComponent],
  exports: [RatingBarComponent],
})
export class RatingBarModule {}
