import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { filter, takeUntil } from 'rxjs/operators';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';
import { ITableState } from 'src/app/shared/table/table.reducer';
import { IAssessment } from 'src/app/shared/interfaces/assessment.interface';
import { Observable } from 'rxjs';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IButtonSelector } from 'src/app/shared/components/button-selector/button-selector.component';

@Component({
	selector: 'advenium-assessment-popup',
	templateUrl: './assessment-popup.component.html',
})
export class AssessmentPopupComponent extends UnSubscriber implements OnInit {
	public constructor(private _dialogService: DialogRef, private _store: Store<any>) {
		super();
	}

	public types: IButtonSelector[] = [
		{ name: 'Pre-Assessment', id: '1' },
		{ name: 'Post-Assessment', id: '2' },
	];

	public creating!: boolean;

	public language: FormControl = new FormControl();

	public assessment!: IAssessment | undefined;

	public modalities$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'modalities')
		.pipe(takeUntil(this.unsubscribe$$));

	public sex$: Observable<IDropdownData[]> = this._store
		.select('dropdown', 'sex')
		.pipe(takeUntil(this.unsubscribe$$));

	public assessmentForm!: FormGroup;

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({
			...this.assessment,
			...this.assessmentForm.value,
		});
	}

	public initForm(): void {
		this._store.dispatch(DropdownActions.GetLegendsPending());
		this.assessmentForm = new FormGroup({
			modalityId: new FormControl(this.assessment?.modalityId || ''),
			patientName: new FormControl(this.assessment?.patientName || ''),
			type: new FormControl(this.assessment?.type.toString() || '1'),
			title: new FormControl(this.assessment?.title || ''),
			sexId: new FormControl(this.assessment?.sexId || ''),
			ageFrom: new FormControl(this.assessment?.ageFrom || ''),
			ageTo: new FormControl(this.assessment?.ageTo || ''),
		});
		this.assessmentForm.get('patientName')?.disable();
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetSexPending());
		this._store.dispatch(DropdownActions.GetModalitiesPending());
		this._store
			.select('assessment', 'table')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((assessmentTable: unknown) => {
				this.assessment = (assessmentTable as ITableState<IAssessment, IAssessment>).current;
				this.initForm();
			});
	}
}
