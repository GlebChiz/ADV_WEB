import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CommonGridService } from '../../services/grid.service';
import { GridActions } from './grid.actions';

@Injectable()
export class GridEffects {
	public getList$ = createEffect(() =>
		this.actions$.pipe(
			ofType(GridActions.GetList),
			switchMap((payload) => {
				return this.service
					.getGridList(payload.gridId, payload.controller, payload.state, payload.filter)
					.pipe(
						map((response) => {
							return GridActions.GetListSuccess({ gridId: payload.gridId, data: response });
						}),
						catchError(() => EMPTY),
					);
			}),
		),
	);

	public getSelectedItemModel$ = createEffect(() =>
		this.actions$.pipe(
			ofType(GridActions.GetSelectedItemModel),
			switchMap((payload) =>
				this.service.getSelectedItemModel(payload.gridId, payload.model).pipe(
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

	public constructor(private actions$: Actions, private service: CommonGridService) {}
}
