import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import {
	IPersonDemographicInfo,
	IPersonInfo,
} from 'src/app/shared/components/demografic/demographic.component';
import { IPersonContactInfo } from 'src/app/shared/components/contact/contact.component';
import { PersonService } from 'src/app/shared/services/person.service';
import { PersonActions } from '../actions/person.actions';

@Injectable()
export class PersonEffects {
	public constructor(private actions$: Actions, private personService: PersonService) {}

	public getPesronDemographicInfo$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.GetPersonDemographicInfoPending),
			mergeMap(({ id }: { id: string }) =>
				this.personService.getPersonDemographicInfo(id).pipe(
					map((personDemographicInfo: IPersonDemographicInfo) => {
						return PersonActions.GetPersonDemographicInfoSuccess({ personDemographicInfo, id });
					}),
					catchError(() => of(PersonActions.GetPersonDemographicInfoError())),
				),
			),
		),
	);

	public updatePesronDemographicInfo$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.UpdatePersonDemographicInfoPending),
			mergeMap(
				({
					id,
					personDemographicInfo,
				}: {
					id: string;
					personDemographicInfo: IPersonDemographicInfo;
				}) =>
					this.personService.updatePersonDemographicInfo(id, personDemographicInfo).pipe(
						map(() => {
							return PersonActions.UpdatePersonDemographicInfoSuccess();
						}),
						catchError(() => of(PersonActions.UpdatePersonDemographicInfoError())),
					),
			),
		),
	);

	public getPersonInfo$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.GetPersonInfoPending),
			mergeMap(({ id }: { id: string }) =>
				this.personService.getPersonInfo(id).pipe(
					map((personInfo: IPersonInfo) => {
						return PersonActions.GetPersonInfoSuccess({ personInfo, id });
					}),
					catchError(() => of(PersonActions.GetPersonInfoError())),
				),
			),
		),
	);

	public getPesronContactInfo$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.GetPersonContactInfoPending),
			mergeMap(({ id }: { id: string }) =>
				this.personService.getPersonContactInfo(id).pipe(
					map((personContactInfo: IPersonContactInfo) => {
						return PersonActions.GetPersonContactInfoSuccess({ personContactInfo, id });
					}),
					catchError(() => of(PersonActions.GetPersonContactInfoError())),
				),
			),
		),
	);

	public updatePersonInfo$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.UpdatePersonInfoPending),
			mergeMap(({ id, personInfo }: { id: string; personInfo: IPersonInfo }) =>
				this.personService.updatePersonInfo(id, personInfo).pipe(
					map(() => {
						return PersonActions.UpdatePersonInfoSuccess();
					}),
					catchError(() => of(PersonActions.UpdatePersonInfoError())),
				),
			),
		),
	);

	public updatePesronContactInfo$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.UpdatePersonContactInfoPending),
			mergeMap(({ id, personContactInfo }: { id: string; personContactInfo: IPersonContactInfo }) =>
				this.personService.updatePersonContactInfo(id, personContactInfo).pipe(
					map(() => {
						return PersonActions.UpdatePersonContactInfoSuccess();
					}),
					catchError(() => of(PersonActions.UpdatePersonContactInfoError())),
				),
			),
		),
	);
}
