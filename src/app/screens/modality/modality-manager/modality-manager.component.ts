import { Component } from '@angular/core';
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
	// 	private _store: Store<IAppState>,
	// 	private _service: ModalityService,
	// 	public validationService: ValidationMessageService,
	// ) {}
	// public ngOnInit(): void {
	// 	this._store.dispatch(
	// 		PageSettingsActions.SetTitle({ settings: { title: 'Modalities Manager' } }),
	// 	);
	// }
	// public gridId = 'modality-manager-grid';
	// public modalityModel: IPatientModality | null = null;
	// public linkArray(
	// 	// column: IGridColumnInfo,
	// 	item: any,
	// ) {
	// 	return ['/call', item.id];
	// }
	// public columns(): IGridColumnInfo[] {
	// 	return [
	// 		{
	// 			name: 'name',
	// 			title: 'Name',
	// 			filter: {
	// 				field: 'name',
	// 			},
	// 			sortDirection: SortDirection.Asc,
	// 		} as IGridColumnInfo,
	// 		{
	// 			name: 'description',
	// 			title: 'Description',
	// 			sortDirection: SortDirection.Asc,
	// 			filter: {
	// 				field: 'description',
	// 			},
	// 		} as IGridColumnInfo,
	// 	];
	// }
	// public openDetails(e: any): void {
	// 	this._service.getModel(e.id).subscribe((x: any) => {
	// 		this.modalityModel = x;
	// 	});
	// }
	// public openDuplicate(e: any): void {
	// 	this._service.getModel(e.id).subscribe((x: any) => {
	// 		x.id = null;
	// 		this.modalityModel = x;
	// 	});
	// }
	// public remove(e: any): void {
	// 	if (!window.confirm('Are you sure you want to delete modality?')) {
	// 		return;
	// 	}
	// 	this._service.deleteModel(e.id).subscribe((response: any) => {
	// 		this.validationService.displayResponse(response);
	// 		this._store.dispatch(GridActions.ReloadGrid({ gridId: this.gridId }));
	// 	});
	// }
	// public openNewItem(): void {
	// 	this.modalityModel = {} as IPatientModality;
	// }
	// public onSave(): void {
	// 	this._store.dispatch(GridActions.ReloadGrid({ gridId: this.gridId }));
	// }
}
