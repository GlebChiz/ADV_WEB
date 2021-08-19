import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-session-plan-popup',
	templateUrl: './session-plan-popup.component.html',
})
export class SessionPlanPopupComponent extends UnSubscriber implements OnInit {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public sessionPlan: any;

	public seriesPlansDropdown$: Observable<any> = this._store.select('seriesPlanDropdown', 'data');

	public sessionPlanForm!: FormGroup;

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

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
			.select('sessionPlanTable' as any)
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((sessionPlanTable: any) => {
				this.sessionPlan = sessionPlanTable.current;
				this.initForm();
			});
	}
}
