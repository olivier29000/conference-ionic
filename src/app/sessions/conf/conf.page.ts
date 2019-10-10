import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Session } from '../../models/session';
import { ProgrammeService } from 'src/app/services/programme.service';
import { Speaker } from 'src/app/models/speaker';

@Component({
  selector: 'app-conf',
  templateUrl: './conf.page.html',
  styleUrls: ['./conf.page.scss'],
})
export class ConfPage implements OnInit {

  id: string;
  listeDeSessions: Session[];
  sessionCourante: Session;
  listeDeSpeakers: Speaker[]=[];

  constructor(private router:Router,private route: ActivatedRoute, private programmeService: ProgrammeService) {
    this.id = route.snapshot.paramMap.get("id")
  }


  ngOnInit() {
    // abonnement au changement de route avec réutilisation du composant par le routeur.
    this.route.paramMap.subscribe((params: ParamMap) => {
      // récupération du paramètre id
      this.id = params.get('id');
    });

    this.listeDeSessions = JSON.parse(localStorage.getItem('listeDeSessions')) as Session[];
    for (const session of this.listeDeSessions) {
      if (session.id.toString() === this.id) {
        this.sessionCourante = session;
        if (this.sessionCourante.speakers) {
          this.programmeService.obtenirSpeakers().subscribe(data => {
            Object.values(data).forEach(speaker => {
              for (const idSpeakerDeLaSessionCourante of this.sessionCourante.speakers) {
                if (speaker.id==idSpeakerDeLaSessionCourante) {
                  this.listeDeSpeakers.push(speaker);
                  console.log(this.listeDeSpeakers)
                }
              }
              
              
            })
          })

        }
      }
    }
  }

  redirectToPageSpeakerDetails(id){
    this.router.navigate([`/speakers/speaker/${id}`]);
  }

}
