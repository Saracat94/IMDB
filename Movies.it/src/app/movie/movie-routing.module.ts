import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviePage } from './movie.page';
import { MovieDetailComponent } from './components/detail/m.detail.component';
import { MovieEditComponent } from './components/edit/m.edit.component';
import { MovieCreateComponent } from './components/create/m.create.component';

const routes: Routes = [
  {
    path: '',
    component: MoviePage,
  },
  {
    path: 'detail/:id',
    component: MovieDetailComponent,
  },
  {
    path: 'edit/:id',
    component: MovieEditComponent,
  },
  {
    path: 'create',
    component: MovieCreateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviePageRoutingModule { }
