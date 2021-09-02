import { createAction, props } from '@ngrx/store';
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
};
