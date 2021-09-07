import {
	IPersonDemographicInfo,
	IPersonInfo,
} from '../components/demografic/demographic.component';
import { IPersonContactInfo } from '../components/contact/contact.component';

export interface IPersonState {
	personDemographicInfo: { [key: string]: IPersonDemographicInfo }[];
	personInfo: { [key: string]: IPersonInfo }[];
	personContactInfo: { [key: string]: IPersonContactInfo }[];
}
