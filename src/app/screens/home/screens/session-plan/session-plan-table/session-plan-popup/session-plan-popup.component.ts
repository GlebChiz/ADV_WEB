import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { ISessionPlan } from 'src/app/shared/interfaces/session-plan.interface';
import { ITableState } from '../../../../../../shared/table/table.reducer';

export interface ISessionPlanCurrent {
	id: string;
	seriesPlanIds: string[];
	orderNumber: number;
	title: string;
	calloutMinutes1: number;
	calloutMinutes2: number;
	calloutMinutes3: number;
	wrapupMinutes: number;
	method: string;
	outline: string;
	callout1: string;
	callout2: string;
	callout3: string;
	wrapup: string;
}

@Component({
	selector: 'advenium-session-plan-popup',
	templateUrl: './session-plan-popup.component.html',
})
export class SessionPlanPopupComponent extends UnSubscriber implements OnInit, AfterViewInit {
	public constructor(private _dialogService: DialogRef, private _store: Store<any>) {
		super();
	}
	public isVisible = false;

	public sessionPlan!: ISessionPlanCurrent | undefined;

	public seriesPlansDropdown$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'seriesPlans',
	);

	public sessionPlanForm!: FormGroup;

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.sessionPlan, ...this.sessionPlanForm.value });
	}

	public initForm(): void {
		this.sessionPlanForm = new FormGroup({
			seriesPlanIds: new FormControl(this.sessionPlan?.seriesPlanIds || []),
			title: new FormControl(this.sessionPlan?.title || ''),
			method: new FormControl(this.sessionPlan?.method || ''),
			outline: new FormControl(this.sessionPlan?.outline || ''),
			calloutMinutes1: new FormControl(this.sessionPlan?.calloutMinutes1 || ''),
			callout1: new FormControl(this.sessionPlan?.callout1 || ''),
			calloutMinutes2: new FormControl(this.sessionPlan?.calloutMinutes2 || ''),
			callout2: new FormControl(this.sessionPlan?.callout2 || ''),
			calloutMinutes3: new FormControl(this.sessionPlan?.calloutMinutes3 || ''),
			callout3: new FormControl(this.sessionPlan?.callout3 || ''),
			wrapupMinutes: new FormControl(this.sessionPlan?.wrapupMinutes || ''),
			wrapup: new FormControl(this.sessionPlan?.wrapup || ''),
		});
	}

	public ngOnInit(): void {
		this._store
		.select('sessionPlanTable')
		.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
		.subscribe((sessionPlanTable: unknown) => {
			this.sessionPlan = (
				sessionPlanTable as ITableState<ISessionPlan, ISessionPlanCurrent>
			).current;
			this.initForm();
		});
	}

	ngAfterViewInit(): void {
		setTimeout(() => { this.isVisible = true; }, 0);
	}
}
