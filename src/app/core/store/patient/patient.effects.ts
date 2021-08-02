import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { PatientGridService } from 'src/app/core/services/patient.service';
import { PatientActions } from './patient.actions';

@Injectable()
export class PatientEffects {
	bla = createEffect(
		() => {
			console.log(this);
			return this.actions$.pipe(
				tap((a) => {
					console.log(a);
				}),
			);
		},
		{ dispatch: false },
	);

	constructor(private actions$: Actions, private gridService: PatientGridService) {
		// this.actions$.subscribe((a) => {
		// 	console.log(a);
		// });
	}

	// updatePatient$ = createEffect(() => {
	// 	return this.actions$.pipe(
	// 		ofType(PatientActions.UpdatePatient),
	// 		switchMap((payload) => {
	// 			return this.gridService.updateModel(payload).pipe(
	// 				map((result) => {
	// 					if (result && result.isSuccess === true) {
	// 						return PatientActions.UpdatePatientComplete();
	// 					}
	// 					return PatientActions.UpdatePatientFail({ errors: result.error });
	// 				}),
	// 			);
	// 		}),
	// 	);
	// });

	// getPersonLinks$ = createEffect(() => {
	// 	return this.actions$.pipe(
	// 		ofType(PatientActions.GetPrivatePersonLinks),
	// 		switchMap((payload) =>
	// 			this.gridService.getPrivatePersonLinks(payload.patientId).pipe(
	// 				map((response) => {
	// 					return PatientActions.GetPrivatePersonLinksSuccess({
	// 						patientId: payload.patientId,
	// 						data: response,
	// 					});
	// 				}),
	// 				catchError(() => EMPTY),
	// 			),
	// 		),
	// 	);
	// });
}
