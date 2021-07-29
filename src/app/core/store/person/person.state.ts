import { Insurance } from '../../models/insurance.model';
import {
	GeneralPersonData,
	Person,
	PersonContactsData,
	PersonDemographicData,
} from '../../models/person.model';

export interface IPersonState {
	person: Person | null;
	generalPersonData: GeneralPersonData | null;
	personDemographicData: PersonDemographicData | null;
	personContactsData: PersonContactsData | null;
	personInsuranceData: Insurance[] | null;
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
