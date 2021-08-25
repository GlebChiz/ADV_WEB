import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { ISeriesPlan } from 'src/app/shared/interfaces/series-plan.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { filter, takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { Observable } from 'rxjs';
import { ITableState } from '../../../../../../shared/table/table.reducer';

export interface ISeriesPlanCurrent {
	id: string;
	modalityIds: string[];
	name: string;
}

@Component({
	selector: 'advenium-series-plan-popup',
	templateUrl: './series-plan-popup.component.html',
})
export class SeriesPlanPopupComponent extends UnSubscriber implements OnInit {
	public constructor(private _dialogService: DialogRef, private _store: Store<any>) {
		super();
	}

	public seriesPlan!: ISeriesPlanCurrent | undefined;

	public seriesPlanForm!: FormGroup;

	public modalities$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'modalities')
		.pipe(takeUntil(this.unsubscribe$$));

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.seriesPlan, ...this.seriesPlanForm.value });
	}

	public initForm(): void {
		this.seriesPlanForm = new FormGroup({
			name: new FormControl(this.seriesPlan?.name || []),
			modalityIds: new FormControl(this.seriesPlan?.modalityIds || [])
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetModalitiesPending());
		this._store
			.select('seriesplanTable')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((seriesPlanTable: unknown) => {
				this.seriesPlan = (seriesPlanTable as ITableState<ISeriesPlan, ISeriesPlanCurrent>).current;
				this.initForm();
			});
	}
}
