import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { IDropdownData } from '../../../../../../shared/interfaces/dropdown.interface';
import { DropdownActions } from '../../../../../../store/actions/dropdowns.actions';

@Component({
	selector: 'advenium-users-manager-popup',
	templateUrl: './users-manager-popup.component.html',
})
export class UsersManagerPopupComponent extends UnSubscriber implements OnInit {
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<IStore>,
		private _fb: FormBuilder,
	) {
		super();
	}

	public roleTypes$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'roleTypes')
		.pipe(takeUntil(this.unsubscribe$$));

	public permissionTypes$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'permissionTypes')
		.pipe(takeUntil(this.unsubscribe$$));

	public usersManagerForm: FormGroup = this._fb.group({
		userName: [],
		id: [],
		languageId: [],
		password: [],
		permissionTypes: [],
		person: [],
		roleTypes: [],
		status: [],
		userId: [],
	});

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close(this.usersManagerForm.value);
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetRoleTypesPending());
		this._store.dispatch(DropdownActions.GetPermissionTypesPending());
		this._store
			.select('user' as any, 'table', 'current')
			.pipe(
				filter((val) => val && Object.keys(val).length !== 0),
				takeUntil(this.unsubscribe$$),
			)
			.subscribe((user: any) => {
				this.usersManagerForm.setValue(user);
			});
	}
}
