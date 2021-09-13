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

	public isVisible: boolean = false;

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

	public ngAfterViewInit(): void {
		setTimeout(() => {
			this.isVisible = true;
		}, 0);
	}

	public initForm(): void {
		this.sessionPlanTranslateForm = new FormGroup({
			original: new FormGroup({
				outline: new FormControl(this.sessionPlanInfo?.original?.outline || ''),
				callout1: new FormControl(this.sessionPlanInfo?.original?.callout1 || ''),
				callout2: new FormControl(this.sessionPlanInfo?.original?.callout2 || ''),
				callout3: new FormControl(this.sessionPlanInfo?.original?.callout3 || ''),
				wrapup: new FormControl(this.sessionPlanInfo?.original?.wrapup || ''),
			}),
			translation: new FormGroup({
				outline: new FormControl(this.sessionPlanInfo?.translation?.outline || ''),
				callout1: new FormControl(this.sessionPlanInfo?.translation?.callout1 || ''),
				callout2: new FormControl(this.sessionPlanInfo?.translation?.callout2 || ''),
				callout3: new FormControl(this.sessionPlanInfo?.translation?.callout3 || ''),
				wrapup: new FormControl(this.sessionPlanInfo?.translation?.wrapup || ''),
			}),
		});
		this.getOriginal().valueChanges.subscribe((itme) => console.log(itme));
		// console.log(this.sessionPlanInfo);

		// this.sessionPlanTranslateForm?.controls?.original?.disable();
	}

	public getOriginal(): FormGroup {
		return this.sessionPlanTranslateForm.get('original') as FormGroup;
	}

	public getTranslation(): FormGroup {
		return this.sessionPlanTranslateForm.get('translation') as FormGroup;
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
