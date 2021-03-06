import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'sessions', loadChildren: './sessions/sessions.module#SessionsPageModule' },
  { path: 'conf/:id', loadChildren: './sessions/conf/conf.module#ConfPageModule' },
  { path: 'speakers', loadChildren: './speakers/speakers.module#SpeakersPageModule' },
  { path: 'speakers/speaker/:id', loadChildren: './speakers/speaker/speaker.module#SpeakerPageModule' },
  { path: 'prise-de-note', loadChildren: './prise-de-note/prise-de-note.module#PriseDeNotePageModule' },
  { path: 'info-telephone', loadChildren: './info-telephone/info-telephone.module#InfoTelephonePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
