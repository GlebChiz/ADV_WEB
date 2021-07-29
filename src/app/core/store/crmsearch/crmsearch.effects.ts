import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CRMSearchService } from '../../services/crmsearch.service';
import { IAppState } from '../state/app.state';

@Injectable()
export class CRMSearchEffects {
	constructor(
		private store: Store<IAppState>,
		private actions$: Actions,
		private service: CRMSearchService,
	) {}
}
