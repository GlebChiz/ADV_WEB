import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { TherapyGroupService } from 'src/app/shared/services/therapy-group.service';
import { TherapyGroupActions } from '../actions/therapy-group.actions';

@Injectable()
export class TherapyGroupEffects {
	public constructor(
		public _store: Store<any>,
		private actions$: Actions,
		private therapyGroupService: TherapyGroupService,
	) {}

	public updateFieldTherapyGroup$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TherapyGroupActions.UpdateFiledTherapyGroupPending),
			mergeMap(({ ids, value, entity }: { ids: string[]; value: any; entity: string }) =>
				this.therapyGroupService.updateFieldTherapyGroup(ids, value, entity).pipe(
					map(() => {
						// this._store.dispatch(TherapyGroupActions.UpdateFiledTherapyGroupSuccess());
						return TherapyGroupActions.UpdateFiledTherapyGroupSuccess();
						// return this.getTableDataPending({
						// 	'asd',
						// 	filter: latest.filter,
						// 	columns: latest.columns,
						// });
					}),
					catchError(() => of(TherapyGroupActions.UpdateFiledTherapyGroupError())),
				),
			),
		),
	);
}
