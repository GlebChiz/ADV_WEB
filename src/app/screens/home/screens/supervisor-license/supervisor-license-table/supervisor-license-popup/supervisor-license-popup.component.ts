import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { filter, takeUntil } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-supervisor-license-popup',
	templateUrl: './supervisor-license-popup.component.html',
})
export class SupervisorLicensePopupComponent extends UnSubscriber implements OnInit, OnChanges {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public supervisorLicense: any;

	public mySupervisorLicenseForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.supervisorLicense, ...this.mySupervisorLicenseForm.value });
	}

	public initForm(): void {
		console.log('this.supervisorLicense', this.supervisorLicense);
		// 	id: guid | null;
		// clinicianId: guid;
		// payerId: guid;
		// start: datetime;
		// end: datetime | null;
		// providerId: string;
		// clinicianName: string;

		this.mySupervisorLicenseForm = new FormGroup({
			id: new FormControl(this.supervisorLicense?.id || ''),
		});
	}

	public ngOnInit(): void {
		this._store
			.select('supervisorLicenseTable' as any)
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((supervisorLicenseTable: any) => {
				this.supervisorLicense = supervisorLicenseTable.current;
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
