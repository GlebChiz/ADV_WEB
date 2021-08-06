import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { IClinician } from 'src/app/core/models/clinician.model';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { GridActions } from 'src/app/core/store/grid/grid.actions';
import { IGridColumnInfo } from 'src/app/core/store/grid/grid.state';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	selector: 'advenium-clinician-manager',
	templateUrl: './clinician-manager.component.html',
})
export class ClinicianManagerComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	public gridId = 'clinician-manager-grid';

	public filterId = 'clinician-manager-filter';

	public clinicianModel: IClinician | null = null;

	public constructor(
		private _store: Store<IAppState>, // private _service: CommonGridService
	) {}

	public linkArray(
		// column: IGridColumnInfo,
		item: any,
	) {
		return ['/clinician', item.id];
	}

	public columns(): IGridColumnInfo[] {
		return [{ name: 'name', title: 'Name', link: true } as IGridColumnInfo];
	}

	public ngOnInit(): void {
		this._store.dispatch(
			PageSettingsActions.SetTitle({ settings: { title: "Clinicians's Manager" } }),
		);
	}

	public ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	public reloadGrid(): void {
		this._store.dispatch(GridActions.ReloadGrid({ gridId: this.gridId }));
	}

	public createButton() {
		return {
			navigate: ['/clinician', Guid.EMPTY],
		};
	}
}
