import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { filter, takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { Observable } from 'rxjs';

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
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<any>,
		private _fb: FormBuilder,
	) {
		super();
	}

	public seriesPlanForm: FormGroup = this._fb.group({
		id: [],
		name: [],
		modalityIds: [],
	});

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
		this._dialogService.close(this.seriesPlanForm.value);
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetModalitiesPending());
		this._store
			.select('seriesplan', 'table', 'current')
			.pipe(filter<ISeriesPlanCurrent>(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((seriesPlan: ISeriesPlanCurrent) => {
				this.seriesPlanForm.setValue(seriesPlan);
			});
	}
}
