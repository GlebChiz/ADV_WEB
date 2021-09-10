import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { IStore } from 'src/app/store';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'advenium-session-plan-translate-popup',
	templateUrl: './session-plan-translate-popup.component.html',
})
export class SessionPlanTranslatePopupComponent extends UnSubscriber implements OnInit {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public sessionPlanTranslate!: ISessionPlanTranslate | undefined;

	public sessionPlanTranslateForm!: FormGroup;

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({
			...this.sessionPlanTranslate,
			...this.sessionPlanTranslateForm.value,
		});
	}

	public initForm(): void {
		this.sessionPlanTranslateForm = new FormGroup({
			original: new FormControl(this.sessionPlanTranslate?.original || ''),
			translation: new FormControl(this.sessionPlanTranslate?.translation || []),
		});
		this.sessionPlanTranslateForm?.controls?.original?.disable();
	}

	public ngOnInit(): void {
		this._store
			.select('sessionPlan' as any, 'table', 'sessionPlanTableTranslate')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((sessionPlanTranslate: any) => {
				this.sessionPlanTranslate = sessionPlanTranslate;
				this.initForm();
			});
		this.initForm();
	}
}

export interface ISessionPlanTranslate {
	id: string;
	languageId: string;
	original: ISessionPlanHtml;
	translation: ISessionPlanHtml;
}

export interface ISessionPlanHtml {
	outline: string;
	callout1: string;
	callout2: string;
	callout3: string;
	wrapup: string;
}
