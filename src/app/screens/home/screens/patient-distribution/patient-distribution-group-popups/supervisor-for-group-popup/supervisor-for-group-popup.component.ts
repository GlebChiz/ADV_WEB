import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-supervisor-for-group-popup',
	templateUrl: './supervisor-for-group-popup.component.html',
})
export class SupervisorForGroupPopupComponent extends UnSubscriber implements OnInit {
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<IStore>,
		private _fb: FormBuilder,
	) {
		super();
	}

	public supervisor$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'supervisorLicense' as any)
		.pipe(takeUntil(this.unsubscribe$$));

	public supervisorForm: FormGroup = this._fb.group({
		supervisor: [],
		startDate: [],
	});

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.supervisorForm.value });
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetSupervisorLicensePending());
	}
}
