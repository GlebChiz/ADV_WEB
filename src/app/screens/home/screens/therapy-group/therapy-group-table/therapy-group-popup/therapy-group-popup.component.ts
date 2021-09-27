import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { TherapyGroupTableActions } from '../therapy-group-table.actions';

@Component({
	selector: 'advenium-therapy-group-popup',
	templateUrl: './therapy-group-popup.component.html',
})
export class TherapyGroupPopupComponent extends UnSubscriber implements OnInit {
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<any>,
		private _fb: FormBuilder,
	) {
		super();
	}

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

	public clinicians$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'clinicians')
		.pipe(takeUntil(this.unsubscribe$$));

	public rooms$: Observable<any> = this._store
		.select('therapygroup', 'rooms', 'data')
		.pipe(takeUntil(this.unsubscribe$$));

	public therapyGroupForm: FormGroup = this._fb.group({
		id: [],
		clinicianId: [],
		createdBy: [],
		createdDate: [],
		languageId: [],
		locationId: [],
		modalityId: [],
		roomId: [],
		seriesPlanId: [],
		start: [],
		updatedBy: [],
		updatedDate: [],
		clinicianName: [],
		weekDay: [],
	});

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.therapyGroupForm.value });
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
		this._store.dispatch(DropdownActions.GetLanguagesPending());
		this._store.dispatch(DropdownActions.GetModalitiesPending());
		this._store.dispatch(DropdownActions.GetSeriesPlansPending());
		this._store.dispatch(DropdownActions.GetLocationsPending());
		this._store.dispatch(DropdownActions.GetCliniciansPending());
		this._store
			.select('therapygroup', 'table', 'current')
			.pipe(filter<ITherapyGroupCurrent>(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((therapyGroup: ITherapyGroupCurrent) => {
				if (therapyGroup?.locationId) {
					this.getRooms(therapyGroup?.locationId);
				}
				this.therapyGroupForm.setValue(therapyGroup);
				this.therapyGroupForm
					.get('locationId')
					?.valueChanges.pipe(filter<string>(Boolean), takeUntil(this.unsubscribe$$))
					.subscribe((locationId: string) => {
						this.getRooms(locationId);
					});
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
