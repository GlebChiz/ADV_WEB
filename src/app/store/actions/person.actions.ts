import { createAction, props } from '@ngrx/store';
import {
	IPersonDemographicInfo,
	IPersonInfo,
} from 'src/app/shared/components/demografic/demographic.component';
import { IPersonContactInfo } from 'src/app/shared/components/contact/contact.component';

export const PersonActions = {
	GetPersonDemographicInfoPending: createAction(
		'[Person] Get person demographic info pending',
		props<{ id: string }>(),
	),
	GetPersonDemographicInfoSuccess: createAction(
		'[Person] Get person demographic info success',
		props<{ personDemographicInfo: IPersonDemographicInfo }>(),
	),
	GetPersonDemographicInfoError: createAction('[Person] Get person demographic info error'),

	GetPersonInfoPending: createAction('[Person] Get person info pending', props<{ id: string }>()),
	GetPersonInfoSuccess: createAction(
		'[Person] Get person info success',
		props<{ personInfo: IPersonInfo }>(),
	),
	GetPersonInfoError: createAction('[Person] Get person info error'),

	UpdatePersonDemographicInfoPending: createAction(
		'[Person] Update person demographic info pending',
		props<{ id: string; personDemographicInfo: IPersonDemographicInfo }>(),
	),
	UpdatePersonDemographicInfoSuccess: createAction(
		'[Person] Update person demographic info success',
	),
	UpdatePersonDemographicInfoError: createAction('[Person] Update person demographic info error'),

	UpdatePersonInfoPending: createAction(
		'[Person] Update person info pending',
		props<{ id: string; personInfo: IPersonInfo }>(),
	),
	UpdatePersonInfoSuccess: createAction('[Person] Update person info success'),
	UpdatePersonInfoError: createAction('[Person] Update person info error'),

	GetPersonContactInfoPending: createAction(
		'[Person] Get person contact info pending',
		props<{ id: string }>(),
	),
	GetPersonContactInfoSuccess: createAction(
		'[Person] Get person contact info success',
		props<{ personContactInfo: IPersonContactInfo }>(),
	),
	GetPersonContactInfoError: createAction('[Person] Get person contact info error'),

	UpdatePersonContactInfoPending: createAction(
		'[Person] Update person contact info pending',
		props<{ id: string; personContactInfo: IPersonContactInfo }>(),
	),
	UpdatePersonContactInfoSuccess: createAction('[Person] Update person contact info success'),
	UpdatePersonContactInfoError: createAction('[Person] Update person contact info error'),
};
