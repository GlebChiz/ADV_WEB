/* eslint-disable no-prototype-builtins */
import { Action, createReducer, on } from '@ngrx/store';
import {
	IPersonDemographicInfo,
	IPersonInfo,
} from 'src/app/shared/components/demografic/demographic.component';
import { IPersonState } from 'src/app/shared/interfaces/person.interface';
import { IPersonContactInfo } from 'src/app/shared/components/contact/contact.component';
import { PersonActions } from '../actions/person.actions';

const initialPersonState: IPersonState = {
	personDemographicInfo: [],
	personInfo: [],
	personContactInfo: [],
};

export function personReducers(
	locationState: IPersonState | undefined,
	action: Action,
): IPersonState {
	return createReducer(
		initialPersonState,
		on(
			PersonActions.GetPersonDemographicInfoSuccess,
			(
				state: IPersonState,
				{
					personDemographicInfo,
					id,
				}: { personDemographicInfo: IPersonDemographicInfo; id: string },
			) => {
				return {
					...state,
					personDemographicInfo: [...state.personDemographicInfo, { [id]: personDemographicInfo }],
				};
			},
		),
		on(
			PersonActions.GetPersonInfoSuccess,
			(state: IPersonState, { personInfo, id }: { personInfo: IPersonInfo; id: string }) => {
				return { ...state, personInfo: [...state.personInfo, { [id]: personInfo }] };
			},
		),
		on(
			PersonActions.GetPersonContactInfoSuccess,
			(
				state: IPersonState,
				{ personContactInfo, id }: { personContactInfo: IPersonContactInfo; id: string },
			) => {
				return {
					...state,
					personContactInfo: [...state.personContactInfo, { [id]: personContactInfo }],
				};
			},
		),
		on(PersonActions.RemovePersonContact, (state: IPersonState, { id }: { id: string }) => {
			const newPersonContactInfo: {
				[key: string]: IPersonContactInfo;
			}[] = [...state.personContactInfo].filter((item: { [key: string]: IPersonContactInfo }) => {
				return !item.hasOwnProperty(`${[id]}`);
			});

			return {
				...state,
				personContactInfo: [...newPersonContactInfo],
			};
		}),
		on(PersonActions.RemovePersonDemographic, (state: IPersonState, { id }: { id: string }) => {
			const newPersonDemographicInfo: {
				[key: string]: IPersonDemographicInfo;
			}[] = [...state.personDemographicInfo];
			newPersonDemographicInfo.find(
				(item: { [key: string]: IPersonDemographicInfo }, index: number) => {
					if (item?.hasOwnProperty(`${[id]}`)) {
						newPersonDemographicInfo.splice(index, 1);
					}
				},
			);
			return {
				...state,
				personDemographicInfo: [...newPersonDemographicInfo],
			};
		}),
		on(PersonActions.RemovePersonInfo, (state: IPersonState, { id }: { id: string }) => {
			const newPersonInfo: {
				[key: string]: IPersonInfo;
			}[] = [...state.personInfo];
			newPersonInfo.find((item: { [key: string]: IPersonInfo }, index: number) => {
				if (item?.hasOwnProperty(`${[id]}`)) {
					newPersonInfo.splice(index, 1);
				}
			});
			return {
				...state,
				personInfo: [...newPersonInfo],
			};
		}),
	)(locationState, action);
}
