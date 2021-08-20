import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { GroupResult } from '@progress/kendo-data-query';
import { filter, takeUntil } from 'rxjs/operators';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-location-popup',
	templateUrl: './location-popup.component.html',
})
export class LocationPopupComponent extends UnSubscriber implements OnInit {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public locationDropdownInitiatives: (IDropdownData | GroupResult)[] = [];

	public location: any;

	public myLocationForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.location, ...this.myLocationForm.value });
	}

	public initForm(): void {
		this.myLocationForm = new FormGroup({
			name: new FormControl(this.location?.name),
			code: new FormControl(this.location?.code),
			billingCode: new FormControl(this.location?.billingCode),
			address: new FormControl(this.location?.address),
			initiativeIds: new FormControl(this.location?.initiativeIds),
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetLocationInitiativeIdsPending());
		this._store
			.select('locationTable' as any)
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((locationTable: any) => {
				this.location = locationTable.current;
				this.initForm();
			});
		this._store
			.select('locationDropdown')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((locationDropdown: any) => {
				this.locationDropdownInitiatives = locationDropdown?.data;
				this.initForm();
			});
		this._store
			.select('location')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((location: any) => {
				this.location = location.selectedLocation;
				this.initForm();
			});
	}
}
