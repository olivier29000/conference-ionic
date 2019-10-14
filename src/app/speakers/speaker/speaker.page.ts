import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProgrammeService } from 'src/app/services/programme.service';
import { Speaker } from 'src/app/models/speaker';
import { Session } from 'src/app/models/session';
import { Observable } from 'rxjs';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';


@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.page.html',
  styleUrls: ['./speaker.page.scss'],
})
export class SpeakerPage implements OnInit {

  id: string;
  speakerCourant: Speaker;
  aContactSpeakerCourant: boolean;
  listeDeSessions: Session[] = [];
  listeDeSessionsCourantes: Session[] = [];
  listeDeSpeakers:Speaker[];

  // Injection du service ActivatedRoute
  constructor(private contacts: Contacts,private route: ActivatedRoute, private programmeService: ProgrammeService, private router: Router) {


    this.id = route.snapshot.paramMap.get("id")
  }

  
  
  

ngOnInit() {
  

  
  // abonnement au changement de route avec réutilisation du composant par le routeur.
  this.route.paramMap.subscribe((params: ParamMap) => {
    // récupération du paramètre id
    this.id = params.get('id');

  });

  if (localStorage.getItem("listeDeSpeakers")) {
    this.listeDeSpeakers = JSON.parse(localStorage.getItem("listeDeSpeakers")) as Speaker[]
  } else {
    this.programmeService.obtenirSpeakers().subscribe(data => {
      Object.values(data).forEach(speaker => {
        this.listeDeSpeakers.push(speaker)
      })
    })
  }
  for (const speaker of this.listeDeSpeakers) {
    if (speaker.id.toString() == this.id) {
      this.speakerCourant = speaker;
      if (localStorage.getItem("listeDeSessions")) {
        this.listeDeSessions = JSON.parse(localStorage.getItem("listeDeSessions")) as Session[]
      } else {
        this.programmeService.obtenirSessions().subscribe(sessions => {
          Object.values(sessions).forEach(session => {
            this.listeDeSessions.push(session);
          })
        })
      }

      for (const session of this.listeDeSessions) {
        if (session.speakers) {
          for (const idSpeaker of session.speakers) {
            if (this.speakerCourant.id == idSpeaker) {
              this.listeDeSessionsCourantes.push(session);
            }
          }
        }
      }


    }
  }
  
}

creerContact(nom){
  let contact: Contact = this.contacts.create();
  contact.name = new ContactName(null, nom);
  contact.save().then(
    () => alert('Contact saved!'),
    (error: any) => alert('Error saving contact')
  );
}

redirectToPageSessionDetails(id){
  this.router.navigate([`/conf/${id}`])
}
}
