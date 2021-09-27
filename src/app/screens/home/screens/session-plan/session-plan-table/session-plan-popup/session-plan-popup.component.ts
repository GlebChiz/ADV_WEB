import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

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
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<any>,
		private _fb: FormBuilder,
	) {
		super();
	}

	public isVisible = false;

	public sessionPlanForm: FormGroup = this._fb.group({
		id: [],
		title: [],
		seriesPlanIds: [],
		orderNumber: [],
		method: [],
		outline: [],
		calloutMinutes1: [],
		callout1: [],
		calloutMinutes2: [],
		callout2: [],
		calloutMinutes3: [],
		callout3: [],
		wrapupMinutes: [],
		wrapup: [],
	});

	public seriesPlansDropdown$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'seriesPlans',
	);

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close(this.sessionPlanForm.value);
	}

	public ngOnInit(): void {
		this._store
			.select('sessionPlan', 'table', 'current')
			.pipe(filter<ISessionPlanCurrent>(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((sessionPlan: ISessionPlanCurrent) => {
				this.sessionPlanForm.setValue(sessionPlan);
			});
	}

	public ngAfterViewInit(): void {
		setTimeout(() => {
			this.isVisible = true;
		}, 0);
	}
}
