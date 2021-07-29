import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CommonGridService } from '../../services/grid.service';
import { IAppState } from '../state/app.state';
import { GridActions } from './grid.actions';

@Injectable()
export class GridEffects {
	getList$ = createEffect(() =>
		this.actions$.pipe(
			ofType(GridActions.GetList),
			switchMap((payload) =>
				this.service
					.getGridList(payload.gridId, payload.controller, payload.state, payload.filter)
					.pipe(
						map((response) => {
							return GridActions.GetListSuccess({ gridId: payload.gridId, data: response });
						}),
						catchError(() => EMPTY),
					),
			),
		),
	);

	getSelectedItemModel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(GridActions.GetSelectedItemModel),
			switchMap((payload) =>
				this.service.getSelectedItemModel(payload.gridId, payload.controller, payload.model).pipe(
					map((response) => {
						return GridActions.GetSelectedItemModelSuccess({
							gridId: payload.gridId,
							model: response,
						});
					}),
					catchError(() => EMPTY),
				),
			),
		),
	);

	constructor(
		private store: Store<IAppState>,
		private actions$: Actions,
		private service: CommonGridService,
	) {}
}
