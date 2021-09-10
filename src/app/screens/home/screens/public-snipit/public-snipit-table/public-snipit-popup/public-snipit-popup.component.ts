import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { GroupResult } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-public-snipit-popup',
	templateUrl: './public-snipit-popup.component.html',
	styleUrls: ['public-snipit-popup.component.scss'],
})
export class PublicSnipitPopupComponent extends UnSubscriber implements OnInit, OnChanges {
	public constructor(private _dialogService: DialogRef, private _store: Store<IStore>) {
		super();
	}

	public publicSnipit: any;

	public myPublicSnipitForm!: FormGroup;

	public snipitTypes: (IDropdownData | GroupResult)[] = [];

	public snipitCategory$: Observable<IDropdownData[]> = this._store.select(
		'dropdown' as any,
		'snipiCategory',
	);

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public onCancelAction(): void {
		this._dialogService.close();
	}

	public onConfirmAction(): void {
		this._dialogService.close({ ...this.publicSnipit, ...this.myPublicSnipitForm.value });
	}

	public initForm(): void {
		this.myPublicSnipitForm = new FormGroup({
			text: new FormControl(this.publicSnipit?.text || ''),
			categoryId: new FormControl(this.publicSnipit?.categoryId),
			type: new FormControl(this.publicSnipit?.type),
		});
	}

	public ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetSnipiTypePending());
		this._store.dispatch(DropdownActions.GetSnipiCategoryPending());
		this._store
			.select('publicsnipit' as any, 'table')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((modalityTable: any) => {
				this.publicSnipit = modalityTable.current;
				this.initForm();
			});
		this._store
			.select('dropdown' as any, 'snipitTypes')
			.pipe(filter(Boolean), takeUntil(this.unsubscribe$$))
			.subscribe((publicSnipitDropdown: any) => {
				this.snipitTypes = publicSnipitDropdown;
				this.initForm();
			});
		this.initForm();
	}

	public ngOnChanges(): void {
		this.initForm();
	}
}
