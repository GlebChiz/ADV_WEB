import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { IGridColumnInfo } from 'src/app/core/store/grid/grid.state';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	selector: 'advenium-patient-manager',
	templateUrl: './patient-manager.component.html',
})
export class PatientManagerComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	gridId = 'patient-manager-grid';

	filterId = 'patient-manager-filter';

	constructor(
		private _store: Store<IAppState>, // private _service: CommonGridService
	) {}

	ngOnInit(): void {
		this._store.dispatch(
			PageSettingsActions.SetTitle({ settings: { title: "Patients's Manager" } }),
		);
	}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	columns(): IGridColumnInfo[] {
		return [{ name: 'name', title: 'Name', link: true } as IGridColumnInfo];
	}

	linkArray(item: any) {
		return ['/patient', item.id];
	}
}
