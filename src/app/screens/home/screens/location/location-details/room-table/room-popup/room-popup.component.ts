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
	selector: 'advenium-room-popup',
	templateUrl: './room-popup.component.html',
})
export class RoomPopupComponent extends UnSubscriber implements OnInit {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public room: any;

	public roomSetup: (IDropdownData | GroupResult)[] = [];

	public roomSize: (IDropdownData | GroupResult)[] = [];

	public myRoomForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.room, ...this.myRoomForm.value });
	}

	public initForm(): void {
		this.myRoomForm = new FormGroup({
			name: new FormControl(this.room?.name),
			description: new FormControl(this.room?.description),
			direction: new FormControl(this.room?.direction),
			setups: new FormControl(this.room?.setups),
			roomSize: new FormControl(this.room?.roomSize),
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetRoomSizePending());
		this._store.dispatch(DropdownActions.GetRoomSetupPending());
		this._store
			.select('roomsTable' as any)
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((roomTable: any) => {
				this.room = roomTable.current;
				this.initForm();
			});
		this._store
			.select('roomDropdown' as any)
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((roomDropdown: any) => {
				this.roomSetup = roomDropdown?.roomSetup;
				this.roomSize = roomDropdown?.roomSize;
				this.initForm();
			});
	}
}
