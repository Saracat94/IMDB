import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';


import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfileDettaglioPage } from './components/dettaglio/p.detail';
import { HeaderModule } from '../shared/components/header/header.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, ProfileDettaglioPage]
})
export class ProfilePageModule {}
