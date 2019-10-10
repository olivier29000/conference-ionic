import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Journee } from '../models/journee';
import { Session } from 'protractor';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class ProgrammeService {

  constructor(private http: HttpClient) { }

  obtenirSchedule():Observable<Journee[]>{
    return this.http.get<Journee[]>(
      'https://devfest-nantes-2018-api.cleverapps.io/schedule',
      httpOptions
       )
        ;
  }


  obtenirSessions():Observable<JSON>{
    return this.http.get<JSON>(
      'https://devfest-nantes-2018-api.cleverapps.io/sessions',
      httpOptions
       );
  }


  obtenirSpeakers():Observable<JSON>{
    return this.http.get<JSON>(
      'https://devfest-nantes-2018-api.cleverapps.io/speakers',
      httpOptions
       );
  }
}



