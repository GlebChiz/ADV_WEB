import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { GroupResult } from '@progress/kendo-data-query';
import { filter, takeUntil } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-location-popup',
	templateUrl: './location-popup.component.html',
})
export class LocationPopupComponent extends UnSubscriber implements OnInit, OnChanges {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public listItems: string[] = [
		'Baseball',
		'Basketball',
		'Cricket',
		'Field Hockey',
		'Football',
		'Table Tennis',
		'Tennis',
		'Volleyball',
	];

	public initiatives: (DropDownData | GroupResult)[] = [];

	public value: any = [];

	public location: any;

	public myLocationForm!: FormGroup;

	public payerTypes: (DropDownData | GroupResult)[] = [];

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
		});
	}

	public ngOnInit(): void {
		this._store
			.select('locationTable' as any)
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((payerTable: any) => {
				this.location = payerTable.current;
				this.initForm();
			});
		this.initForm();
	}

	public ngOnChanges(): void {
		this.initForm();
	}
}

export interface DropDownData {
	id: string;
	name: string;
	isDisabled: boolean;
	parentId: string;
}
