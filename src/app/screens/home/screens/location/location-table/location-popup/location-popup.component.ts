import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { StringOperationFilter } from 'src/app/shared/interfaces/filter.interface';
import { ILocation } from 'src/app/shared/interfaces/location.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-location-popup',
	templateUrl: './location-popup.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationPopupComponent extends UnSubscriber implements OnInit {
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<IStore>,
		private _fb: FormBuilder,
	) {
		super();
	}

	public locationForm: FormGroup = this._fb.group({
		id: [],
		name: [],
		code: [],
		billingCode: [],
		address: [],
		initiativeIds: [],
		isSchool: [],
		roomCount: [],
	});

	public locationDropdownInitiatives$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'locationInitiativeIds',
	);

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: StringOperationFilter.Contains,
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.locationForm.value });
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetLocationInitiativeIdsPending());
		this._store
			.select('location' as any, 'table', 'current')
			.pipe(filter<ILocation>(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((location: ILocation) => {
				this.locationForm.setValue(location);
			});
		this._store
			.select('location' as any, 'locationInfo', 'selectedLocation')
			.pipe(filter<ILocation>(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((selectedLocation: ILocation) => {
				this.locationForm.setValue(selectedLocation);
			});
	}
}
