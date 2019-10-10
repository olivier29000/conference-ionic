import { Component, OnInit } from '@angular/core';
import { Journee } from '../models/journee';
import { Session } from '../models/session';
import { ProgrammeService } from '../services/programme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {


  listeDeSessions: Session[]= [];

  constructor(private programmeService: ProgrammeService, private router:Router) { }

  ngOnInit() {

    this.programmeService.obtenirSessions().subscribe((data) => {
      Object.values(data).forEach(session => {
        this.listeDeSessions.push(session)
      })
      localStorage.setItem("listeDeSessions",JSON.stringify(this.listeDeSessions))
    });
  }

  redirectToPageSessionDetails(id) {
    
    this.router.navigate([`/conf/${id}`]);
    
}
}


