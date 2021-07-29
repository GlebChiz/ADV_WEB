import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService, GridDataService } from 'src/app/shared/services';
import { GridInfo } from '../store/grid/grid.state';
import { IAppState } from '../store/state/app.state';

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
		).pipe(switchMap((response) => this.getGridWithController(controller, 'grid-data', filterId)));
	}

	getGridViews(gridId: string): Observable<any> {
		return this.get(`views/${gridId}`);
	}

	getGridSettings(id: Guid | string): Observable<any> {
		return this.get(`${id}/get`);
	}

	getDefaultGridSettings(gridId: string): Observable<any> {
		return this.get(`default/${gridId}`);
	}

	getLastGridSettings(gridId: string): Observable<any> {
		return this.get(`last/${gridId}`);
	}

	getSelectedItemModel(gridId: string, controller: string, model: any): Observable<any> {
		const result = this.getModelWithController(controller, 'get-model', model, gridId);
		return result;
	}

	private prepareView(view: GridInfo) {
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

	createGridSettings(view: GridInfo): Observable<any> {
		const data = this.prepareView(view);
		return this.post(`create`, data);
	}

	updateGridSettings(view: GridInfo): Observable<any> {
		const data = this.prepareView(view);
		return this.put(`update`, data);
	}

	makeGridSettingsDefault(id: Guid): Observable<any> {
		return this.put(`default/${id}`);
	}

	constructor(http: HttpClient, auth: AuthenticationService, private _store: Store<IAppState>) {
		super(http, auth, 'gridsettings');
	}
}
