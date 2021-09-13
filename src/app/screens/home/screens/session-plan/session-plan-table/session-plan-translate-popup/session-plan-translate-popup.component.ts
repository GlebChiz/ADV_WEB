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

	public isVisible = false;

	public sessionPlanInfo!: ISessionPlanTranslate | undefined;

	public sessionPlanTranslateForm!: FormGroup;

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({
			...this.sessionPlanInfo,
			...this.sessionPlanTranslateForm.value,
		});
	}

	public initForm(): void {
		this.sessionPlanTranslateForm = new FormGroup({
			originalOutline: new FormControl(this.sessionPlanInfo?.original?.outline || ''),
			originalCallout1: new FormControl(this.sessionPlanInfo?.original?.callout1 || ''),
			originalCallout2: new FormControl(this.sessionPlanInfo?.original?.callout2 || ''),
			originalCallout3: new FormControl(this.sessionPlanInfo?.original?.callout3 || ''),
			originalWrapup: new FormControl(this.sessionPlanInfo?.original?.wrapup || ''),
			translationOutline: new FormControl(this.sessionPlanInfo?.translation?.outline || ''),
			translationCallout1: new FormControl(this.sessionPlanInfo?.translation?.callout1 || ''),
			translationCallout2: new FormControl(this.sessionPlanInfo?.translation?.callout2 || ''),
			translationCallout3: new FormControl(this.sessionPlanInfo?.translation?.callout3 || ''),
			translationCWrapup: new FormControl(this.sessionPlanInfo?.translation?.wrapup || ''),
		});
		this.sessionPlanTranslateForm?.controls?.originalOutline?.disable();
		this.sessionPlanTranslateForm?.controls?.originalCallout1?.disable();
		this.sessionPlanTranslateForm?.controls?.originalCallout2?.disable();
		this.sessionPlanTranslateForm?.controls?.originalCallout3?.disable();
		this.sessionPlanTranslateForm?.controls?.originalWrapup?.disable();
	}

	public ngOnInit(): void {
		this._store
			.select('sessionPlan' as any, 'sessionPlanInfo')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((sessionPlanInfo: any) => {
				this.sessionPlanInfo = sessionPlanInfo;
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
	outline: string | null;
	callout1: string | null;
	callout2: string | null;
	callout3: string | null;
	wrapup: string | null;
}
