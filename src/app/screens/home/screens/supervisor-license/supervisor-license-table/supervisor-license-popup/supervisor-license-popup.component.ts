import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { IStore } from 'src/app/store';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { Observable } from 'rxjs/internal/Observable';

export interface ISupervisorInterface {
	id: string;
	supervisor: string;
	payer: string;
	start: string;
	end: string;
	providerId: string;
}
@Component({
	selector: 'advenium-supervisor-license-popup',
	templateUrl: './supervisor-license-popup.component.html',
})
export class SupervisorLicensePopupComponent extends UnSubscriber implements OnInit {
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<IStore>,
		private _fb: FormBuilder,
	) {
		super();
	}

	public supervisorLicenseForm: FormGroup = this._fb.group({
		clinicianId: [],
		payerId: [],
		startDate: [],
		endDate: [],
		providerId: [],
	});

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({
			...this.supervisorLicenseForm.value,
		});
	}

	// startDate: new FormControl(
	// 	this.supervisorLicense?.start
	// 		? removeTimezone(new Date(this.supervisorLicense?.start))
	// 		: '',
	// ),
	// endDate: new FormControl(
	// 	this.supervisorLicense?.start
	// 		? removeTimezone(new Date(this.supervisorLicense?.start))
	// 		: '',
	// ),

	public supervisor$: Observable<IDropdownData[]> = this._store.select(
		'dropdown' as any,
		'supervisorLicense',
	);

	public payers$: Observable<IDropdownData[]> = this._store.select(
		'dropdown' as any,
		'supervisorLicensePayers',
	);

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetSupervisorLicensePending());
		this._store.dispatch(DropdownActions.GetSupervisorLicensePayersPending());
		// this._store.select('')
	}
}
