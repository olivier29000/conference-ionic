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
  listeDeSpeakers: Speaker[] = [];
  listeDeSpeakersCourant: Speaker[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private programmeService: ProgrammeService) {
    this.id = route.snapshot.paramMap.get("id")
  }


  ngOnInit() {
    // abonnement au changement de route avec réutilisation du composant par le routeur.
    this.route.paramMap.subscribe((params: ParamMap) => {
      // récupération du paramètre id
      this.id = params.get('id');
    });

    if (localStorage.getItem("listeDeSessions")) {
      this.listeDeSessions = JSON.parse(localStorage.getItem("listeDeSessions")) as Session[]
    } else {
      this.programmeService.obtenirSessions().subscribe((data) => {
        Object.values(data).forEach(session => {
          this.listeDeSessions.push(session)
        })
        localStorage.setItem("listeDeSessions", JSON.stringify(this.listeDeSessions))
      });
    }

    for (const session of this.listeDeSessions) {
      if (session.id.toString() === this.id) {
        this.sessionCourante = session;
        if (this.sessionCourante.speakers) {
          if (localStorage.getItem("listeDeSpeakers")) {
            this.listeDeSpeakers = JSON.parse(localStorage.getItem("listeDeSpeakers")) as Speaker[]
          } else {
            this.programmeService.obtenirSpeakers().subscribe(data => {
              Object.values(data).forEach(speaker => {
                this.listeDeSpeakers.push(speaker);

                localStorage.setItem("listeDeSpeakers", JSON.stringify(this.listeDeSpeakers))
              })
            })

          }
          for (const speaker of this.listeDeSpeakers) {
            for (const idSpeakerDeLaSessionCourante of this.sessionCourante.speakers) {
              if (speaker.id == idSpeakerDeLaSessionCourante) {
                this.listeDeSpeakersCourant.push(speaker);
              }
            }
          }

        }
      }
    }
  }

  redirectToPageSpeakerDetails(id) {
    this.router.navigate([`/speakers/speaker/${id}`]);
  }

}
