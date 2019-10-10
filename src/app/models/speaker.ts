import { NumericValueAccessor } from '@ionic/angular';
import { Badge } from './badge';
import { Social } from './social';

export interface Speaker {
    id:number,
    name:string,
    featured:boolean,
    company:string,
    companyLogo:string,
    country:string,
    photoUrl:string,
    shortBio:string,
    bio:string,
    tags:string[],
    badges:Badge[],
    socials:Social[]
}
