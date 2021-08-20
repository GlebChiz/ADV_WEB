/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
// import { CellClickEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';

import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	CLEAR_CURRENT_ITEM,
	CREATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_PENDING,
} from 'src/app/shared/table/table.tokens';
// import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { IColumn } from '../../../../../shared/interfaces/column.interface';
import { SupervisorLicensePopupComponent } from './supervisor-license-popup/supervisor-license-popup.component';

@Component({
	providers: [],
	selector: 'advenium-supervisor-license-table',
	templateUrl: './supervisor-license-table.component.html',
	styleUrls: ['../../../home.component.scss'],
})
export class SupervisorLicenseTableComponent extends CustomTableDirective {
	public constructor(
		private dialogService: DialogService,
		// private _router: Router,
		// private _activatedRoute: ActivatedRoute,
		_store: Store<any>,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(CLEAR_CURRENT_ITEM) private clearCurrentItem: any,
	) {
		super(_store, getTableDataPending, getCurrentItemPending, deleteDataPending, editDataPending);
	}

	// public supervisor: FormControl = new FormControl();

	// public payer: FormControl = new FormControl();

	// public override ngOnInit(): void {
	// 	this._store.dispatch(DropdownActions.GetSupervisorLicensePending());

	// 	this._activatedRoute.queryParams.subscribe((query: Params) => {
	// 		this.addQuery(query.id);
	// 		super.ngOnInit();
	// 		this.selectState();
	// 	});
	// }

	// public addQuery(id: string): void {
	// 	if (this.gridSettings.state.filter && id) {
	// 		this.gridSettings.state.filter.filters = [
	// 			...this.gridSettings.state.filter.filters,
	// 			{
	// 				field: 'supervisors',
	// 				operator: 'contains',
	// 				value: id,
	// 			},
	// 		];
	// 	}
	// }

	// public override dataStateChange(state: DataStateChangeEvent): void {
	// 	super.dataStateChange(state);
	// }

	public deleteWithPopup(id: string): void {
		if (!window.confirm(`Are you sure you want to delete ${this.controller}?`)) {
			return;
		}
		this.delete(id);
	}

	public openDialog(dataItem?: any, isDublicate?: boolean): void {
		console.log('data item', dataItem);
		if (dataItem) {
			this._store.dispatch(
				this.getCurrentItemPending({ id: dataItem.id, controller: this.controller }),
			);
		}
		const dialog: DialogRef = this.dialogService.open({
			title: 'Supervisor License',
			content: SupervisorLicensePopupComponent,
			width: 600,
			height: 310,
			minWidth: 250,
		});

		dialog.content.instance.supervisorLicense = { ...dataItem };
		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				if (isDublicate) {
					result.id = null;
				}
				if (dataItem && !isDublicate) {
					this._store.dispatch(this.editDataPending({ item: result, controller: this.controller }));
					return;
				}
				this._store.dispatch(this.createDataPending({ item: result, controller: this.controller }));
			}
			this._store.dispatch(this.clearCurrentItem());
		});
	}

	// public selectionChange(item: IDropdownData): void {
	// 	if (this.gridSettings.state.filter) {
	// 		this.gridSettings.state.filter.filters = [
	// 			...this.gridSettings.state.filter.filters,
	// 			{
	// 				field: 'supervisor',
	// 				value: item.id,
	// 				operator: 'contains',
	// 			},
	// 		];
	// 	}
	// 	this._store.dispatch(
	// 		this.getTableDataPending({
	// 			controller: this.controller,
	// 			filter: this.gridSettings.state,
	// 			gridId: this.gridId,
	// 		}),
	// 	);
	// }

	public columns: IColumn[] = [
		{
			field: 'supervisor',
			title: 'Supervisor',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'payer',
			title: 'Payer',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'providerId',
			title: 'Provider Id',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'start',
			title: 'Start Date',
			hidden: false,
			filterable: true,
			type: 'date',
		},
		{
			field: 'end',
			title: 'End Date',
			hidden: false,
			filterable: true,
			type: 'date',
		},
	];

	// public onCellClick(e: CellClickEvent): void {
	// 	this._router.navigate([e.dataItem.id], { relativeTo: this._activatedRoute });
	// }
}
