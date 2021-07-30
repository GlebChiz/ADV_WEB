import { IInsurance } from '../../models/insurance.model';
import {
	IGeneralPersonData,
	IPerson,
	IPersonContactsData,
	IPersonDemographicData,
} from '../../models/person.model';

export interface IPersonState {
	person: IPerson | null;
	generalPersonData: IGeneralPersonData | null;
	personDemographicData: IPersonDemographicData | null;
	personContactsData: IPersonContactsData | null;
	personInsuranceData: IInsurance[] | null;
	privatePersonLinks: {};
}

export const initialPersonState: IPersonState = {
	person: null,
	generalPersonData: null,
	personDemographicData: null,
	personContactsData: null,
	personInsuranceData: null,
	privatePersonLinks: {},
};
