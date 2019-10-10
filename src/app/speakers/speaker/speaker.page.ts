import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProgrammeService } from 'src/app/services/programme.service';
import { Speaker } from 'src/app/models/speaker';
import { Session } from 'src/app/models/session';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.page.html',
  styleUrls: ['./speaker.page.scss'],
})
export class SpeakerPage implements OnInit {

  id: string;
  speakerCourant: Speaker;
  listeDeSessions:Session[]=[];

  // Injection du service ActivatedRoute
  constructor(private route: ActivatedRoute, private programmeService: ProgrammeService, private router:Router) {


    this.id = route.snapshot.paramMap.get("id")
  }

  ngOnInit() {
    // abonnement au changement de route avec réutilisation du composant par le routeur.
    this.route.paramMap.subscribe((params: ParamMap) => {
      // récupération du paramètre id
      this.id = params.get('id');

    });
    this.programmeService.obtenirSpeakers().subscribe(data => {
      Object.values(data).forEach(speaker => {
        if (speaker.id.toString() == this.id) {
          this.speakerCourant=speaker;
          
          this.programmeService.obtenirSessions().subscribe(sessions=>{
            Object.values(sessions).forEach(session => {
              if(session.speakers){
              for (const idSpeaker of session.speakers) {
                if(session.speakers && session.speakers==idSpeaker){
                  this.listeDeSessions.push(session)
                }
              }
            }
              
            })
          })


        }
      }
      )
    })

  }

  redirectToPageSessionDetails(id){
    this.router.navigate([`/conf/${id}`])
  }
}
