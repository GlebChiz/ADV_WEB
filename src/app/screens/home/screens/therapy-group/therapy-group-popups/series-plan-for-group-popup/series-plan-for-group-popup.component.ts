import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
	selector: 'advenium-series-plan-for-group-popup',
	templateUrl: './series-plan-for-group-popup.component.html',
})
export class SeriesPlanForGroupPopupComponent extends UnSubscriber implements OnInit, OnChanges {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public seriesPlan$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'seriesPlans' as any)
		.pipe(takeUntil(this.unsubscribe$$));

	public mySeriesPlanForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.mySeriesPlanForm.value });
	}

	public initForm(): void {
		this.mySeriesPlanForm = new FormGroup({
			seriesPlan: new FormControl([]),
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetSeriesPlansPending());
		this.initForm();
	}

	public ngOnChanges(): void {
		this.initForm();
	}
}
