import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { SortDirection } from 'src/app/core/models/filters/column-filter.model';
import { Payer } from 'src/app/core/models/payer.model';
import { PayerGridService } from 'src/app/core/services/payer.service';
import { ValidationMessageService } from 'src/app/core/services/validation.message.service';
import { PageSettingsActions } from 'src/app/core/store/actions/page-settings/page-settings.actions';
import { GridActions } from 'src/app/core/store/grid/grid.actions';
import { GridColumnInfo } from 'src/app/core/store/grid/grid.state';
import { IAppState } from 'src/app/core/store/state/app.state';

@Component({
	selector: 'advenium-payer-manager',
	templateUrl: './payer-manager.component.html',
})
export class PayerManagerComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	gridId = 'payer-manager-grid';

	filterId = 'payer-manager-filter';

	payerModel: Payer | null = null;

	constructor(
		private _store: Store<IAppState>,
		private _service: PayerGridService,
		public validationService: ValidationMessageService,
	) {}

	ngOnInit(): void {
		this._store.dispatch(PageSettingsActions.SetTitle({ settings: { title: "Payers's Manager" } }));
	}

	group() {
		return [{ field: 'type' }];
	}

	columns() {
		return [
			{
				name: 'name',
				title: 'Name',
				filter: {
					field: 'name',
				},
				sortDirection: SortDirection.Asc,
			} as GridColumnInfo,
			{
				name: 'type',
				title: 'Type',
				sortDirection: SortDirection.Asc,
				filter: {
					field: 'typename',
				},
			} as GridColumnInfo,
			{
				name: 'payerId',
				title: 'Payer Id',
				sortDirection: SortDirection.Asc,
				filter: {
					field: 'payerid',
				},
			} as GridColumnInfo,
			{
				name: 'carrierCode',
				title: 'Carrier Code',
				sortDirection: SortDirection.Asc,
				filter: {
					field: 'carrierCode',
				},
			} as GridColumnInfo,
		];
	}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	openNewItem(e: any) {
		this.payerModel = {} as Payer;
	}

	openDetails(e: any) {
		this._service.getModel(e.id).subscribe((x) => {
			this.payerModel = x;
		});
	}

	openDuplicate(e: any) {
		this._service.getModel(e.id).subscribe((x) => {
			x.id = null;
			this.payerModel = x;
		});
	}

	remove(e: any) {
		if (!confirm('Are you sure you want to delete payer?')) {
			return;
		}
		this._service.deleteModel(e.id).subscribe((response) => {
			this.validationService.displayResponse(response);
			this._store.dispatch(GridActions.ReloadGrid({ gridId: this.gridId }));
		});
	}

	onSave(e: Payer) {
		this._store.dispatch(GridActions.ReloadGrid({ gridId: this.gridId }));
	}

	createButton() {
		return {
			title: 'New Payer',
		};
	}
}
