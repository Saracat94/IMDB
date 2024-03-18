import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CelebrityPage } from './celebrity.page';
import { CelebrityCreateComponent } from './components/create/c.create.component';
import { CelebrityDetailComponent } from './components/detail/c.detail.component';
import { CelebrityEditComponent } from './components/edit/c.edit.component.';

const routes: Routes = [
  {
    path: '',
    component: CelebrityPage,
  },
  {
    path: 'detail/:id',
    component: CelebrityDetailComponent,
  },
  {
    path: 'edit/:id',
    component: CelebrityEditComponent,
  },
  {
    path: 'create',
    component: CelebrityCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CelebrityPageRoutingModule {}
