import { formatDate } from '@angular/common';
import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Guid } from 'guid-typescript';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IInsurance, InsuranceOrderType, MetaData } from 'src/app/core/models/insurance.model';
import { IPayer } from 'src/app/core/models/payer.model';
import { IPrivatePersonLink } from 'src/app/core/models/person.model';
import { PersonGridService } from 'src/app/core/services/person.service';
import { PersonActions } from 'src/app/core/store/person/person.actions';
import { selectPersonPrivateLinks } from 'src/app/core/store/person/person.selectors';
import { IAppState } from 'src/app/core/store/state/app.state';
import { DropDownService } from 'src/app/shared/services/dropdown.service';

@Component({
	selector: 'advenium-insurance',
	templateUrl: './insurance-control.component.html',
	styleUrls: ['./insurance-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InsuranceControlComponent),
			multi: true,
		},
	],
})
export class InsuranceControlComponent implements ControlValueAccessor, OnDestroy {
	public form: FormGroup;

	public subscriptions: Subscription[] = [];

	public metaData: any = MetaData;

	public payers: IPayer[] = [];

	public holderInsurances: IInsurance[] | null = null;

	public showHolderInsurances = false;

	private _destroy$ = new Subject();

	public links!: IPrivatePersonLink[];

	public readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	public get exists(): boolean {
		return this.form.value.exists === true;
	}

	public get isVerified(): boolean {
		return this.form.value.verificationDate != null;
	}

	public get value(): IInsurance {
		return this.form.value;
	}

	public set value(value: IInsurance) {
		this.form.setValue(value);
		this.onChange(value);
		this.onTouched();
		if (value.personId) {
			this._store
				.pipe(
					select(selectPersonPrivateLinks, { personId: value.personId }),
					takeUntil(this._destroy$),
				)
				.subscribe((x) => {
					this.links = x;
				});
			this._store.dispatch(PersonActions.GetPrivatePersonLinks({ personId: value.personId }));
		}
	}

	public title(): string {
		return this.getTitle(this.form.value.orderType);
	}

	private getPayerName(payerId: Guid): string {
		return this.payers.filter((x) => x.id === payerId)[0]!.name;
	}

	private getTitle(type: InsuranceOrderType): string {
		switch (type) {
			case InsuranceOrderType.Primary:
				return 'Primary';
			case InsuranceOrderType.Secondary:
				return 'Secondary';
			default:
				return '';
		}
	}

	public onHolderChanged(): void {
		this.holderInsurances = null;
		this.showHolderInsurances = false;
		this.personService.getInsurances(this.form.value.insuranceHolderId).subscribe((x) => {
			this.holderInsurances = x;
			this.resetHolderInsurances();
		});
	}

	public resetHolderInsurances(): void {
		this.showHolderInsurances = false;
		setTimeout(() => (this.showHolderInsurances = true));
	}

	public openPerson(): boolean {
		if (this.form.value.insuranceHolderId !== this.value.personId) {
			this.router.navigate(['/person', this.form.value.insuranceHolderId]);
		}
		return false;
	}

	public insuranceDescription(insurance: IInsurance): string {
		return `${this.getTitle(insurance.orderType)}: ${this.getPayerName(insurance.payerId)}`;
	}

	public copyInsurance(insurance: IInsurance): boolean {
		const value = {
			...this.value,
			exists: true,
			orderType: this.form.value.orderType,
			payerId: insurance.payerId,
			copay: insurance.copay,
			deductible: insurance.deductible,
			memberId: insurance.memberId,
			policyGroup: insurance.policyGroup,
			employee: insurance.employee,
			planName: insurance.planName,
			isVerified: false,
			verificationDate: null,
		};
		this.form.setValue(value);
		return false;
	}

	public constructor(
		private formBuilder: FormBuilder,
		private dropDownService: DropDownService,
		private _store: Store<IAppState>,
		private router: Router,
		private personService: PersonGridService,
	) {
		this.form = this.formBuilder.group({
			id: [],
			payerId: [],
			copay: [],
			deductible: [],
			memberId: [],
			policyGroup: [],
			employee: [],
			planName: [],
			insuredParty: [],
			orderType: [],
			exists: [],
			personId: [],
			patientId: [],
			insuranceHolderId: [],
			isVerified: [],
			verificationDate: [],
		});

		this.subscriptions.push(
			// any time the inner form changes update the parent of any change
			this.form.valueChanges.subscribe((value) => {
				this.onChange(value);
				this.onTouched();
			}),
		);

		this.dropDownService.getPayers().subscribe((x: IPayer[]) => (this.payers = x));
	}

	public writeValue(obj: any): void {
		if (obj) {
			this.value = obj;
		}
		if (obj === null) {
			this.form.reset();
		}
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		if (isDisabled) {
			this.form.disable();
		} else {
			this.form.enable();
		}
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach((s) => s.unsubscribe());
		this._destroy$.next(null);
	}

	public onChange: any = () => {};

	public onTouched: any = () => {};

	public onVerification(e: any): void {
		this.form.value.verificationDate = e.target.checked ? new Date() : null;
	}

	public onExistsChanged(e: any): void {
		const value = {
			...this.value,
			exists: e.target.checked,
			orderType: this.form.value.orderType,
			isVerified: false,
			verificationDate: null,
		};
		this.form.setValue(value);
	}

	public verificationDate(): string {
		return formatDate(this.form.value.verificationDate, 'MM/dd/yyyy', 'en-US');
	}
}
