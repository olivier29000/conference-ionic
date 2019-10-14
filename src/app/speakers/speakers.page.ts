import { Component, OnInit } from '@angular/core';
import { Speaker } from '../models/speaker';
import { ProgrammeService } from '../services/programme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.page.html',
  styleUrls: ['./speakers.page.scss'],
})
export class SpeakersPage implements OnInit {

  listeDeSpeakers:Speaker[]=[];

  constructor(private programmeService:ProgrammeService, private router:Router) { }




  ngOnInit() {
    if (localStorage.getItem("listeDeSpeakers")) {
      this.listeDeSpeakers=JSON.parse(localStorage.getItem("listeDeSpeakers")) as Speaker[]
    } else {
      this.programmeService.obtenirSpeakers().subscribe(data => {
        Object.values(data).forEach(speaker => {
              this.listeDeSpeakers.push(speaker);
          })
          
          localStorage.setItem("listeDeSpeakers",JSON.stringify(this.listeDeSpeakers))
        })
    }
  }

  redirectToPageSpeakerDetail(id){
    this.router.navigate([`/speakers/speaker/${id}`])
  }

}
