import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { Clinician } from 'src/app/core/models/clinician.model';
import { CommonGridService } from 'src/app/core/services/grid.service';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { GridActions } from 'src/app/core/store/grid/grid.actions';
import { GridColumnInfo } from 'src/app/core/store/grid/grid.state';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	selector: 'advenium-clinician-manager',
	templateUrl: './clinician-manager.component.html',
})
export class ClinicianManagerComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	gridId = 'clinician-manager-grid';

	filterId = 'clinician-manager-filter';

	clinicianModel: Clinician | null = null;

	constructor(private _store: Store<IAppState>, private _service: CommonGridService) {}

	linkArray(column: GridColumnInfo, item: any) {
		return ['/clinician', item.id];
	}

	columns(): GridColumnInfo[] {
		return [{ name: 'name', title: 'Name', link: true } as GridColumnInfo];
	}

	ngOnInit(): void {
		this._store.dispatch(
			PageSettingsActions.SetTitle({ settings: { title: "Clinicians's Manager" } }),
		);
	}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	reloadGrid() {
		this._store.dispatch(GridActions.ReloadGrid({ gridId: this.gridId }));
	}

	createButton() {
		return {
			navigate: ['/clinician', Guid.EMPTY],
		};
	}
}
