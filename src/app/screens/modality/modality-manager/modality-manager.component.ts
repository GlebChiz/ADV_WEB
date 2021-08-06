import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { IAppState } from 'src/app/core/store/state/app.state';
import { IFilter } from 'src/app/shared/table/table.model';
// import { Store } from '@ngrx/store';
// import { SortDirection } from 'src/app/core/models/filters/column-filter.model';
// import { IPatientModality } from 'src/app/core/models/patient.model';
// import { ModalityService } from 'src/app/core/services/modality.service';
// import { ValidationMessageService } from 'src/app/core/services/validation.message.service';
// import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
// import { GridActions } from 'src/app/core/store/grid/grid.actions';
// import { IGridColumnInfo } from 'src/app/core/store/grid/grid.state';
// import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	selector: 'advenium-modality',
	templateUrl: './modality-manager.component.html',
	styleUrls: [],
})
export class ModalityManagerComponent implements OnInit {
	public constructor(
		private _store: Store<IAppState>, // private _service: ModalityService, // public validationService: ValidationMessageService,
	) {}

	public remove(e: any): void {
		if (window.confirm('Are you sure you want to delete payer?')) {
			console.log(e);
			return;
		}

		// this._service.deleteModel(e.id).subscribe((response) => {
		// 	this.validationService.displayResponse(response);
		// 	this._store.dispatch(GridActions.ReloadGrid({ gridId: this.gridId }));
		// });
	}

	public ngOnInit(): void {
		this._store.dispatch(
			PageSettingsActions.SetTitle({ settings: { title: `Modalities's Manager` } }),
		);
		this.isLoading = true;
		this._store.select<any>('modalityTable').subscribe((data: any) => {
			this.gridData = data.data;
			this.totalData = data.total;
			this.isLoading = false;
		});
	}

	public filter: IFilter = {
		take: 10,
		countSkipItems: 0,
	};

	public gridData: any[] = [];

	public isLoading: boolean = false;

	public totalData: number = 0;

	public onDataStateChange(state: DataStateChangeEvent): void {
		console.log(state);
		this.isLoading = true;
		this.filter = { take: state.take, countSkipItems: state.skip };
	}
}
