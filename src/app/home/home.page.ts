import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Journee } from '../models/journee';
import { ProgrammeService } from '../services/programme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  programmeJournee: Observable<Journee[]>;

  constructor(private programmeService: ProgrammeService, private router: Router) { }

  ngOnInit() {
    this.programmeJournee = this.programmeService.obtenirSchedule();
  }

  redirectToPageSessions(){
    this.router.navigate(['/sessions'])
  }

  redirectToPagePresentateurs(){
    this.router.navigate(['/presentateurs'])
  }

}
