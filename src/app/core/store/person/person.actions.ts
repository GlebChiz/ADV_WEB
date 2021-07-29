import { createAction, props } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Insurance } from '../../models/insurance.model';
import {
	GeneralPersonData,
	Person,
	PersonContactsData,
	PersonDemographicData,
	PrivatePersonLink,
} from '../../models/person.model';

export const PersonActions = {
	GetPersonModel: createAction('[Person] Get Person Model', props<{ id: Guid | null }>()),
	GetPersonModelSuccess: createAction(
		'[Person] Get Person Model Success',
		props<{ person: Person }>(),
	),
	GetPersonModelFail: createAction('[Person] Get Person Model Fail'),
	GetPrivatePersonLinks: createAction(
		'[Person] Get private persons links',
		props<{ personId: Guid }>(),
	),
	UpdatePerson: createAction('[Person] Update Person', props<Person>()),

	GetGeneralPersonData: createAction(
		'[Person] Get Person General Data Model',
		props<{ id: Guid | null }>(),
	),
	GetGeneralPersonModelSuccess: createAction(
		'[Person] Get General Person Model Success',
		props<{ person: GeneralPersonData }>(),
	),
	GetGeneralPersonModelFail: createAction('[Person] Get General Person Model Fail'),
	UpdateGeneralPersonData: createAction(
		'[Person] Update General Person Data',
		props<GeneralPersonData>(),
	),

	GetInsurancePersonData: createAction(
		'[Person] Get Person Insurance Data Model',
		props<{ id: Guid | null }>(),
	),
	GetInsurancePersonModelSuccess: createAction(
		'[Person] Get Insurance Person Model Success',
		props<{ insurances: Insurance[] }>(),
	),
	GetInsurancePersonModelFail: createAction('[Person] Get Insurance Person Model Fail'),
	UpdateInsurancePersonData: createAction('[Person] Update Insurance Person Data', props<any>()),

	GetPersonDemographicData: createAction(
		'[Person] Get Person Demographic Data Model',
		props<{ id: Guid | null }>(),
	),
	GetPersonDemographicModelSuccess: createAction(
		'[Person] Get Person Demographic Model Success',
		props<{ person: PersonDemographicData }>(),
	),
	GetPersonDemographicModelFail: createAction('[Person] Get Person Demographic Model Fail'),
	UpdatePersonDemographicData: createAction(
		'[Person] Update Person Demographic Data',
		props<PersonDemographicData>(),
	),

	GetPersonContactsData: createAction(
		'[Person] Get Person Contacts Data Model',
		props<{ id: Guid | null }>(),
	),
	GetPersonContactsModelSuccess: createAction(
		'[Person] Get Person Contacts Model Success',
		props<{ person: PersonContactsData }>(),
	),
	GetPersonContactsModelFail: createAction('[Person] Get Person Contacts Model Fail'),
	UpdatePersonContactsData: createAction(
		'[Person] Update Person Contacts Data',
		props<PersonContactsData>(),
	),

	UpdatePersonComplete: createAction('[Person] Update Person Compete'),
	UpdatePersonFail: createAction('[Person] Update Person Fail', props<{ errors: any }>()),
	// tslint:disable-next-line:max-line-length
	GetPrivatePersonLinksSuccess: createAction(
		'[Person] Get private persons links success',
		props<{ personId: Guid; data: PrivatePersonLink[] }>(),
	),
};
