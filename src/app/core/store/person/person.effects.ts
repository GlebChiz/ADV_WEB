import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { PersonGridService } from 'src/app/core/services/person.service';
import { GeneralPersonData } from '../../models/person.model';
import { IAppState } from '../state/app.state';
import { PersonActions } from './person.actions';

@Injectable()
export class PersonEffects {
	getPersonLinks$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.GetPrivatePersonLinks),
			switchMap((payload) =>
				this.gridService.getPrivatePersonLinks(payload.personId.toString()).pipe(
					map((response) => {
						return PersonActions.GetPrivatePersonLinksSuccess({
							personId: payload.personId,
							data: response,
						});
					}),
					catchError(() => EMPTY),
				),
			),
		),
	);

	getPersonModel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.GetPersonModel),
			mergeMap(({ id }) =>
				this.gridService.getPersonModel(id).pipe(
					map((payload) => PersonActions.GetPersonModelSuccess({ person: payload })),
					catchError(() => of(PersonActions.GetPersonModelFail())),
				),
			),
		),
	);

	getGeneralPersonModel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.GetGeneralPersonData),
			mergeMap(({ id }) =>
				this.gridService.getPersonGeneralDataModel(id).pipe(
					map((payload) => PersonActions.GetGeneralPersonModelSuccess({ person: payload })),
					catchError(() => of(PersonActions.GetGeneralPersonModelFail())),
				),
			),
		),
	);

	getInsurancePersonModel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.GetInsurancePersonData),
			mergeMap(({ id }) =>
				this.gridService.getInsurances(id).pipe(
					map((payload) => PersonActions.GetInsurancePersonModelSuccess({ insurances: payload })),
					catchError(() => of(PersonActions.GetInsurancePersonModelFail())),
				),
			),
		),
	);

	getPersonContactsModel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.GetPersonContactsData),
			mergeMap(({ id }) =>
				this.gridService.getPersonContactsDataModel(id).pipe(
					map((payload) => PersonActions.GetPersonContactsModelSuccess({ person: payload })),
					catchError(() => of(PersonActions.GetPersonContactsModelFail())),
				),
			),
		),
	);

	getPersonDemographicModel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.GetPersonDemographicData),
			mergeMap(({ id }) =>
				this.gridService.getPersonDemographicDataModel(id).pipe(
					map((payload) => PersonActions.GetPersonDemographicModelSuccess({ person: payload })),
					catchError(() => of(PersonActions.GetPersonDemographicModelFail())),
				),
			),
		),
	);

	updatePerson$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.UpdatePerson),
			switchMap((payload) =>
				this.gridService.updatePerson(payload).pipe(
					map((result) => {
						if (result && result.isValid === true) {
							return PersonActions.UpdatePersonComplete();
						}
						return PersonActions.UpdatePersonFail({ errors: result.error });
					}),
				),
			),
		),
	);

	updatePersonGeneralData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.UpdateGeneralPersonData),
			switchMap((payload) =>
				this.gridService.updatePersonGeneral(payload as GeneralPersonData).pipe(
					map((result) => {
						if (result && result.isValid === true) {
							return PersonActions.UpdatePersonComplete();
						}
						return PersonActions.UpdatePersonFail({ errors: result.error });
					}),
				),
			),
		),
	);

	updatePersonDemographicData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.UpdatePersonDemographicData),
			switchMap((payload) =>
				this.gridService.updatePersonDemographic(payload).pipe(
					map((result) => {
						if (result && result.isValid === true) {
							return PersonActions.UpdatePersonComplete();
						}
						return PersonActions.UpdatePersonFail({ errors: result.error });
					}),
				),
			),
		),
	);

	updatePersonContactsData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.UpdatePersonContactsData),
			switchMap((payload) =>
				this.gridService.updatePersonContacts(payload).pipe(
					map((result) => {
						if (result && result.isValid === true) {
							return PersonActions.UpdatePersonComplete();
						}
						return PersonActions.UpdatePersonFail({ errors: result.error });
					}),
				),
			),
		),
	);

	updatePersonInsuranceData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PersonActions.UpdateInsurancePersonData),
			switchMap((payload) =>
				this.gridService.saveInsurance(payload).pipe(
					map((result) => {
						if (result && result.isValid === true) {
							return PersonActions.UpdatePersonComplete();
						}
						return PersonActions.UpdatePersonFail({ errors: result.error });
					}),
				),
			),
		),
	);

	constructor(
		private store: Store<IAppState>,
		private actions$: Actions,
		private gridService: PersonGridService,
	) {}
}
