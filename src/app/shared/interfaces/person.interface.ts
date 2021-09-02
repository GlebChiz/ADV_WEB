import {
	IPersonDemographicInfo,
	IPersonInfo,
} from '../components/demografic/demographic.component';

export interface IPersonState {
	// eslint-disable-next-line @typescript-eslint/ban-types
	personDemographicInfo: IPersonDemographicInfo | {};
	personInfo: IPersonInfo | {};
}
