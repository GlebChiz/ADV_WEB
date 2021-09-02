import { createAction, props } from '@ngrx/store';
import { IPersonContactInfo } from 'src/app/shared/components/contact/contact.component';

import { IPersonDemographicInfo } from 'src/app/shared/components/demografic/demographic.component';

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

	UpdatePersonDemographicInfoPending: createAction(
		'[Person] Update person demographic info pending',
		props<{ id: string; personDemographicInfo: IPersonDemographicInfo }>(),
	),
	UpdatePersonDemographicInfoSuccess: createAction(
		'[Person] Update person demographic info success',
	),
	UpdatePersonDemographicInfoError: createAction('[Person] Update person demographic info error'),


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
