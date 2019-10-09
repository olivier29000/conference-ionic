import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Journee } from '../models/journee';
import { ProgrammeService } from '../services/programme.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [],
})
export class HomePage {


  programmeJournee: Observable<Journee[]>;
  programmeJourneeCache:Journee[];
  

  constructor(private programmeService: ProgrammeService, private router: Router) { }

  ngOnInit() {
    this.programmeJourneeCache=JSON.parse(localStorage.getItem('programmeJournee')) as Journee[];
    if (this.programmeJourneeCache!=undefined) {     
      console.log("if")
      this.programmeJournee= of(this.programmeJourneeCache);    
    }else{
      console.log("else")
      this.programmeJournee = this.programmeService.obtenirSchedule();
      this.programmeService.obtenirSchedule().subscribe((data)=>{
        this.programmeJourneeCache=data ;
        localStorage.setItem("programmeJournee",JSON.stringify(this.programmeJourneeCache))
        });
    }
    
  }

  redirectToPageSessions(){
    this.router.navigate(['/sessions'])
  }

  redirectToPagePresentateurs(){
    this.router.navigate(['/presentateurs'])
  }

}
