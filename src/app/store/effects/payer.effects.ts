import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { IPayerType } from 'src/app/shared/interfaces/payer.interface';
import { PayerService } from 'src/app/shared/services/payer.service';
import { PayerActions } from '../actions/payer.actions';

@Injectable()
export class PayerEffects {
	public constructor(private actions$: Actions, private payerService: PayerService) {}

	public getTypes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PayerActions.GetTypesPending),
			mergeMap(() =>
				this.payerService.getTypes().pipe(
					map((types: IPayerType[]) => {
						return PayerActions.GetTypesSuccess({ types });
					}),
					catchError(() => of(PayerActions.GetTypesError())),
				),
			),
		),
	);
}
