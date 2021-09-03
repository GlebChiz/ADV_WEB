import {
	IPersonDemographicInfo,
	IPersonInfo,
} from '../components/demografic/demographic.component';
import { IPersonContactInfo } from '../components/contact/contact.component';

export interface IPersonState {
	personDemographicInfo: IPersonDemographicInfo | {};
	personInfo: IPersonInfo | {};
	personContactInfo: IPersonContactInfo | {};
}
