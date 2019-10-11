import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PriseDeNotePage } from './prise-de-note.page';

const routes: Routes = [
  {
    path: '',
    component: PriseDeNotePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PriseDeNotePage]
})
export class PriseDeNotePageModule {}
