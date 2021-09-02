/* eslint-disable @typescript-eslint/ban-types */
import { IPersonContactInfo } from '../components/contact/contact.component';
import {
	IPersonDemographicInfo,
	IPersonInfo,
} from '../components/demografic/demographic.component';

export interface IPersonState {
	personDemographicInfo: IPersonDemographicInfo | {};
	personContactInfo: IPersonContactInfo | {};
  personInfo: IPersonInfo | {};
}
