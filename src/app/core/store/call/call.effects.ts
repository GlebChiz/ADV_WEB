import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { CallService } from '../../services/call.service';
import { IAppState } from '../state/app.state';
import { CallActions } from './call.actions';

@Injectable()
export class CallEffects {
	getActiveCall$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CallActions.GetActiveCall),
			mergeMap(() =>
				this.service
					.getActiveCall()
					.pipe(map((payload) => CallActions.SetActiveCall({ call: payload }))),
			),
		),
	);

	endCall$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CallActions.EndCall),
			switchMap((payload) =>
				this.service.endCall(payload.callId).pipe(
					map((result) => {
						if (result && result.isValid === true) {
							return CallActions.GetCall({ callId: payload.callId });
						}
						return CallActions.UpdateCallFail({ errors: result.error });
					}),
				),
			),
		),
	);

	getCall$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CallActions.GetCall),
			mergeMap(({ callId }) =>
				this.service
					.getModel(callId)
					.pipe(map((payload) => CallActions.SetCall({ call: payload }))),
			),
		),
	);

	updateCall$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CallActions.UpdateCall),
			switchMap((payload) =>
				this.service.updateModel(payload.call).pipe(
					map((result) => {
						if (result && result.isSuccess === true) {
							CallActions.GetActiveCall();
							return CallActions.RefreshCall({ id: payload.call.id });
						}
						return CallActions.UpdateCallFail({ errors: result.error });
					}),
				),
			),
		),
	);

	createCall$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CallActions.CreateCall),
			switchMap((payload) =>
				this.service.createModel(payload.call).pipe(
					map((result) => {
						if (result && result.isSuccess === true) {
							return CallActions.GetActiveCall();
						}
						return CallActions.UpdateCallFail({ errors: result.error });
					}),
				),
			),
		),
	);

	saveCallPatient$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CallActions.SaveCallPatient),
			switchMap((payload) =>
				this.service.createPatientIndex(payload.model).pipe(
					map((result) => {
						if (result && result.isValid === true) {
							return CallActions.RefreshCall({ id: payload.model.callId });
						}
						return CallActions.UpdateCallFail({ errors: result.error });
					}),
				),
			),
		),
	);

	constructor(
		private store: Store<IAppState>,
		private actions$: Actions,
		private service: CallService,
	) {}
}
