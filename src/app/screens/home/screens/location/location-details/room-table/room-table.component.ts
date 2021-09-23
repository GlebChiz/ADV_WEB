/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/shared/interfaces/address.intarface';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IInitiativeId, ILocation } from 'src/app/shared/interfaces/location.interface';
import { CustomTableDirective } from 'src/app/shared/table/table.directive';
import {
	CLEAR_CURRENT_ITEM,
	CREATE_ITEM_TABLE_PENDING,
	DELETE_ITEM_TABLE_PENDING,
	EDIT_ITEM_TABLE_PENDING,
	GET_CURRENT_ITEM_PENDING,
	GET_GRID_SETTINGS_PENDING,
	GET_TABLE_DATA_PENDING,
	MAKE_DEFAULT_GRID_PENDING,
	RENAME_GRID_PENDING,
	SAVE_GRID_CHANGES_PENDING,
	SAVE_GRID_SETTINGS_PENDING,
} from 'src/app/shared/table/table.tokens';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { LocationActions } from 'src/app/store/actions/location.actions';
import { LocationPopupComponent } from '../../location-table/location-popup/location-popup.component';
import { RoomPopupComponent } from './room-popup/room-popup.component';

@Component({
	providers: [],
	selector: 'advenium-room-table',
	templateUrl: './room-table.component.html',
	styleUrls: ['../../../../home.component.scss'],
})
export class RoomTableComponent extends CustomTableDirective implements OnInit {
	public constructor(
		private _activatedRoute: ActivatedRoute,
		_router: Router,
		_store: Store<any>,
		dialogService: DialogService,
		_clipboardApi: ClipboardService,
		_toasterService: ToastrService,
		@Inject(GET_TABLE_DATA_PENDING) getTableDataPending: any,
		@Inject(GET_CURRENT_ITEM_PENDING) getCurrentItemPending: any,
		@Inject(DELETE_ITEM_TABLE_PENDING) deleteDataPending: any,
		@Inject(EDIT_ITEM_TABLE_PENDING) editDataPending: any,
		@Inject(CREATE_ITEM_TABLE_PENDING) private createDataPending: any,
		@Inject(CLEAR_CURRENT_ITEM) private clearCurrentItem: any,
		@Inject(SAVE_GRID_SETTINGS_PENDING) saveNewGridSettingsPending: any,
		@Inject(SAVE_GRID_CHANGES_PENDING) saveGridChangesPending: any,
		@Inject(GET_GRID_SETTINGS_PENDING) getGridSettingsPending: any,
		@Inject(MAKE_DEFAULT_GRID_PENDING) makeDefaultGridPending: any,

		@Inject(RENAME_GRID_PENDING) renameGridPending: any,
	) {
		super(
			_store,
			dialogService,
			_clipboardApi,
			_router,
			_toasterService,
			getTableDataPending,
			getCurrentItemPending,
			deleteDataPending,
			editDataPending,
			saveNewGridSettingsPending,
			saveGridChangesPending,
			getGridSettingsPending,
			makeDefaultGridPending,
			renameGridPending,
		);
	}

	public infoLocation!: ILocation | undefined;

	public deleteWithPopup(id: string): void {
		if (!window.confirm(`Are you sure you want to delete ${this.controller}?`)) {
			return;
		}
		this.delete(id);
	}

	public initiativeIds: string[] = [];

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetLocationInitiativeIdsPending());
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
			LocationActions.GetSelectedLocationPending({ id: this._activatedRoute.snapshot.params.id }),
		);
		this._store
			.select('location', 'selectedLocation')
			.subscribe((location: ILocation | undefined) => {
				this.infoLocation = location;
				this._store
					.select('dropdown', 'locationInitiativeIds') // TODO BAD
					.subscribe((locationInitiativeIds: IInitiativeId[]) => {
						this.initiativeIds = [];
						this.infoLocation?.initiativeIds?.forEach((item: string | undefined) => {
							this.initiativeIds.push();
							const res: string | undefined = locationInitiativeIds?.find(
								(initiativeId: IInitiativeId) => {
									return initiativeId.id === item;
								},
							)?.name;
							if (res) {
								this.initiativeIds.push(res);
							}
						});
					});
			});

		super.ngOnInit();
	}

	public openDialogLocation(): void {
		const dialog: DialogRef = this.dialogService.open({
			title: 'Location',
			content: LocationPopupComponent,
			width: 700,
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
			width: 700,
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
			field: 'sizeName',
			title: 'Size',
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
		this._router.navigate(['/locations']);
	}
}
