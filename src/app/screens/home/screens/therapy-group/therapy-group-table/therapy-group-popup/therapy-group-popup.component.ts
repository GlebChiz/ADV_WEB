import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { ITherapyGroup } from 'src/app/shared/interfaces/therapy-group.interface';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { ITableState } from '../../../../../../shared/table/table.reducer';
import { TherapyGroupTableActions } from '../therapy-group-table.actions';

@Component({
	selector: 'advenium-therapy-group-popup',
	templateUrl: './therapy-group-popup.component.html',
})
export class TherapyGroupPopupComponent extends UnSubscriber implements OnInit {
	public constructor(private _dialogService: DialogRef, private _store: Store<any>) {
		super();
	}

	public therapyGroup!: ITherapyGroupCurrent | undefined;

	public languages$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'languages')
		.pipe(takeUntil(this.unsubscribe$$));

	public locations$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'locations')
		.pipe(takeUntil(this.unsubscribe$$));

	public seriesPlans$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'seriesPlans')
		.pipe(takeUntil(this.unsubscribe$$));

	public modalities$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'modalities')
		.pipe(takeUntil(this.unsubscribe$$));

	public rooms$: Observable<any> = this._store
		.select('therapyGroupTable', 'rooms', 'data')
		.pipe(takeUntil(this.unsubscribe$$));

	public therapyGroupForm!: FormGroup;

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.therapyGroup, ...this.therapyGroupForm.value });
	}

	public initForm(): void {
		this.therapyGroupForm = new FormGroup({
			// clinicianId: new FormControl(this.therapyGroup?.clinicianId || ''),
			// clinicianName: new FormControl(this.therapyGroup?.clinicianName || ''),
			// createdBy: new FormControl(this.therapyGroup?.createdBy || ''),
			// createdDate: new FormControl(this.therapyGroup?.createdDate || ''),
			// id: new FormControl(this.therapyGroup?.id || ''),
			languageId: new FormControl(this.therapyGroup?.languageId || ''),
			locationId: new FormControl(this.therapyGroup?.locationId || ''),
			modalityId: new FormControl(this.therapyGroup?.modalityId || ''),
			roomId: new FormControl(this.therapyGroup?.roomId || ''),
			seriesPlanId: new FormControl(this.therapyGroup?.seriesPlanId || ''),
			// start: new FormControl(this.therapyGroup?.start || ''),
			// updatedBy: new FormControl(this.therapyGroup?.updatedBy || ''),
			// updatedDate: new FormControl(this.therapyGroup?.updatedDate || ''),
		});
		this.therapyGroupForm.get('locationId')?.valueChanges.subscribe((locationId: string) => {
			if (locationId) {
				this.getRooms(locationId);
			}
		});
	}

	public getRooms(locationId: string): void {
		if (!locationId) {
			return;
		}
		this._store.dispatch(
			TherapyGroupTableActions.GetRoomsPending({
				controller: 'room',
				gridId: 'rooms',
				filter: {
					skip: 0, // page number indexed by 0
					take: 10000000, // how many rows are shown
					sort: [],
					filter: {
						logic: 'and',
						filters: [
							{
								field: 'locationId',
								operator: 'custom',
								value: locationId,
							},
						],
					},
				},
			}),
		);
	}

	public ngOnInit(): void {
		if (this.therapyGroup?.languageId) {
			this.getRooms(this.therapyGroup?.languageId);
		}

		this._store.dispatch(DropdownActions.GetLanguagesPending());
		this._store.dispatch(DropdownActions.GetModalitiesPending());
		this._store.dispatch(DropdownActions.GetSeriesPlansPending());
		this._store.dispatch(DropdownActions.GetSeriesPlansPending());
		this._store.dispatch(DropdownActions.GetLocationsPending());
		this._store
			.select('therapyGroupTable', 'table')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((therapyGroupTable: unknown) => {
				this.therapyGroup = (
					therapyGroupTable as ITableState<ITherapyGroup, ITherapyGroupCurrent>
				).current;

				this.initForm();
			});
	}
}

export interface ITherapyGroupCurrent {
	clinicianId: string;
	clinicianName: string;
	createdBy?: string;
	createdDate: Date;
	id: string;
	languageId: string;
	locationId: string;
	modalityId: string;
	roomId: string;
	seriesPlanId: string;
	start: Date;
	updatedBy?: string;
	updatedDate: string;
}
