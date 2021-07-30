import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService, GridDataService } from 'src/app/shared/services';
import { IGridInfo } from '../store/grid/grid.state';

@Injectable({ providedIn: 'root' })
export class CommonGridService extends GridDataService {
	getGridList(
		gridId: string,
		controller: string,
		state: DataStateChangeEvent,
		filter?: any,
	): Observable<GridDataResult> {
		const filterId = Guid.create();
		return this.saveFilterWithController(
			controller,
			'grid-filter',
			filterId,
			state,
			filter,
			gridId,
		).pipe(switchMap(() => this.getGridWithController(controller, 'grid-data', filterId)));
	}

	getGridViews(gridId: string): Observable<any> {
		return this.get(`views/${gridId}`);
	}

	getIGridSettings(id: Guid | string): Observable<any> {
		return this.get(`${id}/get`);
	}

	getDefaultIGridSettings(gridId: string): Observable<any> {
		return this.get(`default/${gridId}`);
	}

	getLastIGridSettings(gridId: string): Observable<any> {
		return this.get(`last/${gridId}`);
	}

	getSelectedItemModel(gridId: string, model: any): Observable<any> {
		const result = this.getModelWithController('get-model', model, gridId);
		return result;
	}

	private prepareView(view: IGridInfo) {
		return {
			id: view.id,
			title: view.title,
			isDefault: view.isDefault,
			gridId: view.gridId,
			columns: JSON.stringify(view.columns),
			filters: JSON.stringify(view.filters),
			sorting: JSON.stringify(view.sorting),
		};
	}

	createIGridSettings(view: IGridInfo): Observable<any> {
		const data = this.prepareView(view);
		return this.post(`create`, data);
	}

	updateIGridSettings(view: IGridInfo): Observable<any> {
		const data = this.prepareView(view);
		return this.put(`update`, data);
	}

	makeIGridSettingsDefault(id: Guid): Observable<any> {
		return this.put(`default/${id}`);
	}

	constructor(
		http: HttpClient,
		auth: AuthenticationService,
		// private _store: Store<IAppState>
	) {
		super(http, auth, 'gridsettings');
	}
}
