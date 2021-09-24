import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-room-popup',
	templateUrl: './room-popup.component.html',
})
export class RoomPopupComponent extends UnSubscriber implements OnInit {
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<IStore>,
		private _fb: FormBuilder,
	) {
		super();
	}

	public roomSetup$: Observable<IDropdownData[]> = this._store.select('dropdown', 'roomSetup');

	public roomSize$: Observable<IDropdownData[]> = this._store.select('dropdown', 'roomSize');

	public roomForm: FormGroup = this._fb.group({
		id: [],
		locationId: [],
		name: [],
		description: [],
		setups: [],
		sizeId: [],
	});

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.roomForm.value });
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetRoomSizePending());
		this._store.dispatch(DropdownActions.GetRoomSetupPending());
		this._store
			.select('room' as any, 'table', 'current')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((roomTable: any) => {
				this.roomForm.setValue(roomTable);
			});
	}
}
