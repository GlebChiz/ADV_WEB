/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	CLEAR_CURRENT_ITEM,
	CREATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_TABLE_DATA_PENDING,
} from 'src/app/shared/table/table.tokens';
import { LocationActions } from 'src/app/store/actions/location.actions';
import { LocationPopupComponent } from '../../location-table/location-popup/location-popup.component';
// import { LocationPopupComponent } from '../../location-table/location-popup/location-popup.component';
import { RoomPopupComponent } from './room-popup/room-popup.component';

@Component({
	providers: [],
	selector: 'advenium-room-table',
	templateUrl: './room-table.component.html',
	styleUrls: ['../../../../home.component.scss', './room-table.component.scss'],
})
export class RoomTableComponent extends CustomTableDirective implements OnInit {
	public constructor(
		private dialogService: DialogService,
		private _activatedRoute: ActivatedRoute,
		private router: Router,
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

	public infoLocation: any;

	public deleteWithPopup(id: string): void {
		if (!window.confirm(`Are you sure you want to delete ${this.controller}?`)) {
			return;
		}
		this.delete(id);
	}

	public ngOnInit(): void {
		if (this.gridSettings.state.filter) {
			this.gridSettings.state.filter.filters = [
				...this.gridSettings.state.filter.filters,
				{
					field: 'locationId',
					operator: 'custom',
					value: this._activatedRoute.snapshot.params.id,
				},
			];
		}
		this._store.dispatch(
			this.getTableDataPending({
				controller: this.controller,
				filter: this.gridSettings.state,
				gridId: this.gridId,
				column: this.columns,
			}),
		);
		this._store.dispatch(
			LocationActions.GetSelectedLocationPending({ id: this._activatedRoute.snapshot.params.id }),
		);
		this._store.select('location', 'selectedLocation').subscribe((location: any) => {
			this.infoLocation = location;
		});
	}

	public openDialogLocation(): void {
		const dialog: DialogRef = this.dialogService.open({
			title: 'Location',
			content: LocationPopupComponent,
			width: 600,
			height: 550,
			minWidth: 250,
		});

		dialog.content.instance.location = { ...this.infoLocation };
		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				this._store.dispatch(this.editDataPending({ item: result, controller: 'location' }));
			}
			this._store.dispatch(this.clearCurrentItem());
		});
	}

	public openDialog(dataItem?: any, isDublicate?: boolean): void {
		if (dataItem) {
			this._store.dispatch(
				this.getCurrentItemPending({ id: dataItem.id, controller: this.controller }),
			);
		}

		const dialog: DialogRef = this.dialogService.open({
			title: 'Room',
			content: RoomPopupComponent,
			width: 600,
			height: 550,
			minWidth: 250,
		});
		dialog.content.instance.room = { ...dataItem };
		dialog.result.subscribe((result: any) => {
			if (!(result instanceof DialogCloseResult)) {
				if (isDublicate) {
					result.id = null;
				}
				if (dataItem && !isDublicate) {
					this._store.dispatch(this.editDataPending({ item: result, controller: this.controller }));
					return;
				}

				this._store.dispatch(
					this.createDataPending({
						item: {
							...result,
							locationId: this._activatedRoute.snapshot.params.id,
						},
						controller: this.controller,
					}),
				);
			}
			this._store.dispatch(this.clearCurrentItem());
		});
	}

	public columns: IColumn[] = [
		{
			field: 'name',
			title: 'Name',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'size',
			title: 'Size',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'setup',
			title: 'Setup',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'direction',
			title: 'Direction',
			hidden: false,
			filterable: true,
			type: 'text',
		},
		{
			field: 'description',
			title: 'Description',
			hidden: false,
			filterable: true,
			type: 'text',
		},
	];

	public back(): void {
		this.router.navigate(['/locations']);
	}
}
