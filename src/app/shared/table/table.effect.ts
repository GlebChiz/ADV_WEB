/* eslint-disable @typescript-eslint/no-explicit-any */
// import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Guid } from 'guid-typescript';
import { map, switchMap } from 'rxjs/operators';
import { CommonGridService } from 'src/app/core/services/grid.service';
import { environment } from 'src/environments/environment';
// import { DataService } from '../services/data.service';
import { GET_TABLE_DATA_PENDING, UPDATE_TABLE_STATE } from './table.tokens';

@Injectable()
export class TableEffects {
	public constructor(
		private actions$: Actions,
		// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
		@Inject(GET_TABLE_DATA_PENDING) private getTableDataPending: any,
		// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
		@Inject(UPDATE_TABLE_STATE) private updateTableState: any,
		private _modalityService: CommonGridService, // private http: HttpClient,
	) {}

	public getTableData$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.getTableDataPending),

			switchMap(({ controller }: { controller: string }) =>
				this._modalityService
					.getGridList(`${controller}-manager-grid`, controller, {
						skip: 0,
						take: 10,
						sort: [],
					})
					.pipe(
						map((result: any) => {
							console.log(`${environment.apiUrl}/${controller}/${Guid.create()}/grid-data`);
							console.log(result);
							console.log(controller);
							return this.updateTableState();
						}),
					),
			),
		);
	});
}
