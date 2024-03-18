import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterModule } from '../shared/components/footer/footer.model';
import { HeaderModule } from '../shared/components/header/header.module';
import { LinksModule } from '../shared/components/links/links.module';
import { ListModule } from '../shared/components/list/list.module';
import { RangeModule } from '../shared/components/range/range.module';
import { RatingBarModule } from '../shared/components/rating_bar/ratingbar.module';
import { PipesModule } from '../shared/pipe/pipes.module';
import { MovieCreateComponent } from './components/create/m.create.component';
import { MovieDetailComponent } from './components/detail/m.detail.component';
import { MovieEditComponent } from './components/edit/m.edit.component';
import { MoviePageRoutingModule } from './movie-routing.module';
import { MoviePage } from './movie.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MoviePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ListModule,
    HeaderModule,
    LinksModule,
    PipesModule,
    RangeModule,
    RatingBarModule,
    FooterModule
  ],
  declarations: [
    MoviePage,
    MovieDetailComponent,
    MovieEditComponent,
    MovieCreateComponent,
  ],
})
export class MoviePageModule {}
