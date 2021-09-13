import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { ITableState } from '../../../../../../shared/table/table.reducer';

export interface ISeriesPlanCurrent {
	id: string;
	modalityId: string;
	name: string;
}

@Component({
	selector: 'advenium-clinician-popup',

	templateUrl: './clinician-popup.component.html',
})
export class ClinicianPopupComponent extends UnSubscriber implements OnInit {
	public constructor(private _dialogService: DialogRef, private _store: Store<any>) {
		super();
	}

	public clinician!: any;

	public areas$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'areas')
		.pipe(takeUntil(this.unsubscribe$$));

	public serviceSubTypes$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'serviceSubTypes')
		.pipe(takeUntil(this.unsubscribe$$));

	public clinicianForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.clinician, ...this.clinicianForm.value });
	}

	public initForm(): void {
		this.clinicianForm = new FormGroup({
			isSupervisor: new FormControl(this.clinician?.isSupervisor || false),
			npi: new FormControl(this.clinician?.npi || ''),
			billingCode: new FormControl(this.clinician?.billingCode || ''),
			areaIds: new FormControl(this.clinician?.areaIds || []),
			person: new FormGroup({
				address: new FormControl(this.clinician?.address || ''),
				firstname: new FormControl(this.clinician?.firstname || ''),
				lastname: new FormControl(this.clinician?.lastname || ''),
				dob: new FormControl(this.clinician?.dob || ''),
				middlename: new FormControl(this.clinician?.middlename || ''),
			}),
		});
	}

	public getPerson(): FormGroup {
		return this.clinicianForm.get('person') as FormGroup;
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetAreasPending());
		this._store.dispatch(DropdownActions.GetServiceSubTypesPending());
		this._store
			.select('clinician', 'table')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((cliniciansTable: unknown) => {
				this.clinician = (cliniciansTable as ITableState<any, any>).current;
				this.initForm();
			});
	}
}
