import { Track } from './track';
import { TimesLot } from './times-lot';

export interface Journee {

    date: string,
    dateReadable: string,
    tracks: Track[],
    ListeDeTimeslots: TimesLot[]
      
}
