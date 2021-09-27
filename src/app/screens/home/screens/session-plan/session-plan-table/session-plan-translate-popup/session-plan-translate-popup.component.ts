import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { IStore } from 'src/app/store';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'advenium-session-plan-translate-popup',
	templateUrl: './session-plan-translate-popup.component.html',
})
export class SessionPlanTranslatePopupComponent
	extends UnSubscriber
	implements OnInit, AfterViewInit
{
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<IStore>,
		private _fb: FormBuilder,
	) {
		super();
	}

	public isVisible: boolean = false;

	public sessionPlanTranslateForm: FormGroup = this._fb.group({
		id: [],
		languageId: [],
		original: this._fb.group({
			outline: [],
			callout1: [],
			callout2: [],
			callout3: [],
			wrapup: [],
		}),
		translation: this._fb.group({
			outline: [],
			callout1: [],
			callout2: [],
			callout3: [],
			wrapup: [],
		}),
	});

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close(this.sessionPlanTranslateForm.value);
	}

	public ngAfterViewInit(): void {
		setTimeout(() => {
			this.isVisible = true;
		}, 0);
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
			.pipe(
				filter<ISessionPlanTranslate>((val) => val && Object.keys(val).length !== 0),
				takeUntil(this.unsubscribe$$),
			)
			.subscribe((sessionPlanInfo: ISessionPlanTranslate) => {
				this.sessionPlanTranslateForm.setValue(sessionPlanInfo);
			});
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
