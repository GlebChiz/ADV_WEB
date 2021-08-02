import { createAction, props } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { IInsurance } from '../../models/insurance.model';
import {
	IGeneralPersonData,
	IPerson,
	IPersonContactsData,
	IPersonDemographicData,
	IPrivatePersonLink,
} from '../../models/person.model';

export const PersonActions = {
	GetPersonModel: createAction('[Person] Get Person Model', props<{ id: Guid | null }>()),
	GetPersonModelSuccess: createAction(
		'[Person] Get Person Model Success',
		props<{ person: IPerson }>(),
	),
	GetPersonModelFail: createAction('[Person] Get Person Model Fail'),
	GetPrivatePersonLinks: createAction(
		'[Person] Get private persons links',
		props<{ personId: Guid }>(),
	),
	UpdatePerson: createAction('[Person] Update Person', props<IPerson>()),

	GetGeneralPersonData: createAction(
		'[Person] Get Person General Data Model',
		props<{ id: Guid | null }>(),
	),
	GetGeneralPersonModelSuccess: createAction(
		'[Person] Get General Person Model Success',
		props<{ person: IGeneralPersonData }>(),
	),
	GetGeneralPersonModelFail: createAction('[Person] Get General Person Model Fail'),
	UpdateGeneralPersonData: createAction(
		'[Person] Update General Person Data',
		props<IGeneralPersonData>(),
	),

	GetInsurancePersonData: createAction(
		'[Person] Get Person Insurance Data Model',
		props<{ id: Guid | null }>(),
	),
	GetInsurancePersonModelSuccess: createAction(
		'[Person] Get Insurance Person Model Success',
		props<{ insurances: IInsurance[] }>(),
	),
	GetInsurancePersonModelFail: createAction('[Person] Get Insurance Person Model Fail'),
	UpdateInsurancePersonData: createAction('[Person] Update Insurance Person Data', props<any>()),

	GetPersonDemographicData: createAction(
		'[Person] Get Person Demographic Data Model',
		props<{ id: Guid | string }>(),
	),
	GetPersonDemographicModelSuccess: createAction(
		'[Person] Get Person Demographic Model Success',
		props<{ person: IPersonDemographicData }>(),
	),
	GetPersonDemographicModelFail: createAction('[Person] Get Person Demographic Model Fail'),
	UpdatePersonDemographicData: createAction(
		'[Person] Update Person Demographic Data',
		props<IPersonDemographicData>(),
	),

	GetPersonContactsData: createAction(
		'[Person] Get Person Contacts Data Model',
		props<{ id: Guid | null }>(),
	),
	GetPersonContactsModelSuccess: createAction(
		'[Person] Get Person Contacts Model Success',
		props<{ person: IPersonContactsData }>(),
	),
	GetPersonContactsModelFail: createAction('[Person] Get Person Contacts Model Fail'),
	UpdatePersonContactsData: createAction(
		'[Person] Update Person Contacts Data',
		props<IPersonContactsData>(),
	),

	UpdatePersonComplete: createAction('[Person] Update Person Compete'),
	UpdatePersonFail: createAction('[Person] Update Person Fail', props<{ errors: any }>()),
	// tslint:disable-next-line:max-line-length
	GetPrivatePersonLinksSuccess: createAction(
		'[Person] Get private persons links success',
		props<{ personId: Guid; data: IPrivatePersonLink[] }>(),
	),
};
