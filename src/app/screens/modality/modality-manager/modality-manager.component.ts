import { Component } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
// import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
// import { IAppState } from 'src/app/core/store/state/app.state';
// import { IFilter } from 'src/app/shared/table/table.model';
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
export class ModalityManagerComponent {
	// public constructor(
	// 	private _store: Store<IAppState>, // private _service: ModalityService, // public validationService: ValidationMessageService,
	// ) {}
	// public ngOnInit(): void {
	// 	this._store.dispatch(
	// 		PageSettingsActions.SetTitle({ settings: { title: `Modalities's Manager` } }),
	// 	);
	// 	this.isLoading = true;
	// 	this._store.select<any>('modalityTable').subscribe((data: any) => {
	// 		this.gridData = data.data;
	// 		this.totalData = data.total;
	// 		this.isLoading = false;
	// 	});
	// 	this._store.select('gridState', 'gridNewEntity').subscribe((newModality: any) => {
	// 		console.log(newModality);
	// 		if (newModality) {
	// 			this.newItem = newModality;
	// 		}
	// 	});
	// 	this._store.select('gridState', 'gridChangedEntity').subscribe((changedModality: any) => {
	// 		console.log(changedModality);
	// 		if (changedModality) {
	// 			this.changedItem = changedModality;
	// 		}
	// 	});
	// }
	// public filter: IFilter = {
	// 	take: 10,
	// 	countSkipItems: 0,
	// 	sort: [],
	// };
	// public idForDelete!: string;
	// public newItem!: any;
	// public changedItem!: any;
	// public duplicatedItem!: any;
	// public gridData: any[] = [];
	// public isLoading: boolean = false;
	// public totalData: number = 0;
	// public modalityModel: any = null;
	// public onDataStateChange(state: DataStateChangeEvent): void {
	// 	console.log('asdasdasd');
	// 	console.log(state);
	// 	this.isLoading = true;
	// 	this.filter = {
	// 		take: state.take,
	// 		countSkipItems: state.skip,
	// 		sort: [{ "dir": 'desc', "field": 'name' }],
	// 	};
	// }
	// public removeItem(e: any): void {
	// 	if (window.confirm('Are you sure you want to delete modality?')) {
	// 		this.idForDelete = e.id;
	// 	}
	// }
	// public openNewItem(): void {
	// 	this.modalityModel = {} as any;
	// }
	// public editItem(e: any): void {
	// 	console.log(e);
	// 	this.modalityModel = e;
	// 	// this.editItem = e;
	// }
	// public dublicateItem(e: any): void {
	// 	e.id = null;
	// 	this.modalityModel = e;
	// 	this.duplicatedItem = e;
	// }
}
