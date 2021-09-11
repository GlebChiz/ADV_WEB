import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { IStore } from 'src/app/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'advenium-session-plan-translate-popup',
	templateUrl: './session-plan-translate-popup.component.html',
})
export class SessionPlanTranslatePopupComponent extends UnSubscriber implements OnInit {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public isVisible = false;

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
			id: new FormControl(this.sessionPlanTranslate?.id || false),
			languageId: new FormControl(this.sessionPlanTranslate?.languageId || ''),
			original: new FormGroup({
				outline: new FormControl(this.sessionPlanTranslate?.original.outline || ''),
				callout1: new FormControl(this.sessionPlanTranslate?.original.callout1 || ''),
				callout2: new FormControl(this.sessionPlanTranslate?.original.callout2 || ''),
				callout3: new FormControl(this.sessionPlanTranslate?.original.callout3 || ''),
				wrapup: new FormControl(this.sessionPlanTranslate?.original.wrapup || ''),
			}),
			translation: new FormGroup({
				outline: new FormControl(this.sessionPlanTranslate?.translation.outline || ''),
				callout1: new FormControl(this.sessionPlanTranslate?.translation.callout1 || ''),
				callout2: new FormControl(this.sessionPlanTranslate?.translation.callout2 || ''),
				callout3: new FormControl(this.sessionPlanTranslate?.translation.callout3 || ''),
				wrapup: new FormControl(this.sessionPlanTranslate?.translation.wrapup || ''),
			}),
		});
	}

	// public initForm(): void {
	// 	this.sessionPlanTranslateForm = new FormGroup({
	// 		original: new FormControl(this.sessionPlanTranslate?.original || ''),
	// 		translation: new FormControl(this.sessi onPlanTranslate?.translation || []),
	// 	});
	// 	this.sessionPlanTranslateForm?.controls?.original?.disable();
	// }
	public translate$: Observable<any> = this._store.select(
		'sessionPlanTable' as any,
		'sessionPlanInfo',
	);

	public ngOnInit(): void {
		// this._store
		// 	.select('sessionPlanTable' as any, 'sessionPlanInfo')
		// 	.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
		// 	.subscribe((sessionPlanTranslate: any) => {
		// 		console.log(sessionPlanTranslate);
		// 		// this.sessionPlanTranslate = sessionPlanTranslate;
		// 		this.initForm();
		// 	});
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
	outline: string | null;
	callout1: string | null;
	callout2: string | null;
	callout3: string | null;
	wrapup: string | null;
}
