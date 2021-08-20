import { SupervisorActions } from './../../../../../../store/actions/supervisor.action';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { GroupResult } from '@progress/kendo-data-query';
import { filter, takeUntil } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';

@Component({
	selector: 'advenium-supervisor-license-popup',
	templateUrl: './supervisor-license-popup.component.html',
})
export class SupervisorLicensePopupComponent extends UnSubscriber implements OnInit, OnChanges {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public supervisorLicense: any;

	public myForm!: FormGroup;

	public supervisorDropdown: (IDropdownData | GroupResult)[] = [];

	public supervisorPayerDropdown: (IDropdownData | GroupResult)[] = [];

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({
			...this.supervisorLicense,
			...this.myForm.value,
		});
	}

	public initForm(): void {
		console.log('this.supervisorLicense', this.supervisorLicense);
		console.log('this.supervisorLicense?.payer)', this.supervisorLicense?.payer);

		this.myForm = new FormGroup({
			id: new FormControl(this.supervisorLicense?.id || ''),
			supervisor: new FormControl(this.supervisorLicense?.supervisor || ''),
			payer: new FormControl(this.supervisorLicense?.payer || ''),
			start: new FormControl(this.supervisorLicense?.start || ''),
			end: new FormControl(this.supervisorLicense?.end || ''),
			providerId: new FormControl(this.supervisorLicense?.providerId || ''),
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetSupervisorLicensePending());
		this._store.dispatch(DropdownActions.GetSupervisorLicensePayersPending());
		this._store.dispatch(SupervisorActions.GetSupervisorPending());
		this._store
			.select('supervisorLicenseDropdown' as any)
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((supervisorLicense: any) => {
				this.supervisorDropdown = supervisorLicense.supervisorLicense;
				this.supervisorPayerDropdown = supervisorLicense.payers;
			});
		this.initForm();
	}

	public ngOnChanges(): void {
		this.initForm();
	}
}
