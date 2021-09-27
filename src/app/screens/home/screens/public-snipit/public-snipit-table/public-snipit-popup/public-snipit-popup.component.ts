import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { StringOperationFilter } from 'src/app/shared/interfaces/filter.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-public-snipit-popup',
	templateUrl: './public-snipit-popup.component.html',
	styleUrls: ['public-snipit-popup.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicSnipitPopupComponent extends UnSubscriber implements OnInit {
	public constructor(
		private _dialogService: DialogRef,
		private _store: Store<IStore>,
		private _fb: FormBuilder,
	) {
		super();
	}

	public publicSnipitForm: FormGroup = this._fb.group({
		id: [],
		text: [],
		categoryId: [],
		type: [],
	});

	public snipitCategory$: Observable<IDropdownData[]> = this._store.select(
		'dropdown',
		'snipiCategory',
	);

	public snipitTypes$: Observable<IDropdownData[]> = this._store.select('dropdown', 'snipitTypes');

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: StringOperationFilter.Contains,
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close(this.publicSnipitForm.value);
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetSnipiTypePending());
		this._store.dispatch(DropdownActions.GetSnipiCategoryPending());
		this._store
			.select('publicsnipit' as any, 'table', 'current')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((publicsnipit: any) => {
				this.publicSnipitForm.setValue({
					...publicsnipit,
					type: publicsnipit.type.toString(),
				});
			});
	}
}
