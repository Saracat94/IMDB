import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RangeComponent } from './range.component';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [RangeComponent],
  exports: [RangeComponent],
})
export class RangeModule {}
