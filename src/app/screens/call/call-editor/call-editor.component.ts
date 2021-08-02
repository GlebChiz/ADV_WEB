import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { ICall, CallerType, ICallPatientIndex, MetaData } from 'src/app/core/models/call.model';
import { IDropDownData, LookupTypeCodes } from 'src/app/core/models/kendo/dropdown-data.model';

import { CallActions } from 'src/app/core/store/call/call.actions';
import { IAppState } from 'src/app/core/store/state/app.state';
import { DropDownService } from 'src/app/shared/services/dropdown.service';
import { IPerson, personTitle } from 'src/app/core/models/person.model';
import { formatDate } from '@angular/common';
import { CheckListItemStatus } from 'src/app/core/enums/checklist.types';
import { checkListClassName } from 'src/app/core/models/checklist.model';
import { CallService } from 'src/app/core/services/call.service';
import { Router } from '@angular/router';
import { CRMSearchActions } from 'src/app/core/store/crmsearch/crmsearch.actions';

@Component({
	providers: [],
	selector: 'advenium-call-editor',
	templateUrl: './call-editor.component.html',
})
export class CallEditorComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	@Input() model!: ICall;

	@Input() saveEvent!: Observable<void>;

	@Output() confirmSave: EventEmitter<any> = new EventEmitter();

	private saveSubscription!: Subscription;

	advertisementSources = Array<IDropDownData>();

	callerTypes = Array<IDropDownData>();

	areas = Array<IDropDownData>();

	patientStatuses = Array<IDropDownData>();

	suppressMessages = false;

	myForm!: FormGroup;

	metaData: any = {
		...MetaData,
		lastname: 'Lastname',
		firstname: 'Firstname',
		middlename: 'Middlename',
		dob: 'DOB',
	};

	errors: string[] | null = null;

	messages: string[] | null = null;

	phoneMask = '(999) 000-0000';

	constructor(
		public _store: Store<IAppState>,
		// private actions$: Actions,
		private _dropDownService: DropDownService,
		private _callService: CallService,
		private _router: Router,
	) {}

	ngOnInit(): void {
		combineLatest([
			this._dropDownService.getCallerTypes(),
			this._dropDownService.getLookup(LookupTypeCodes.area),
			this._dropDownService.getLookup(LookupTypeCodes.patientStatus),
		]).subscribe(([xCallerTypes, xAreas, xStatuses]) => {
			this.callerTypes = xCallerTypes.filter((x) => x.id !== CallerType.Unknown.toString());
			this.areas = xAreas.map((i) => ({ ...i, title: `${i.abbreviation} - ${i.name}` }));
			this.patientStatuses = xStatuses;
			this.initForm();
		});
		this.saveSubscription = this.saveEvent.subscribe(() => this.submit());
	}

	sharedCallUrl() {
		const currentAbsoluteUrl = window.location.href;
		const currentRelativeUrl = this._router.url;
		const index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
		const baseUrl = currentAbsoluteUrl.substring(0, index);

		return `${baseUrl}/sharedcalllogin/${this.model.id}`;
	}

	copyUrl() {
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = this.sharedCallUrl();
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
	}

	existingPatients() {
		return this.model.patients.filter((x) => x.patient !== null);
	}

	totalPatients(): number {
		return this.model.patients.length + (this.model.requestedPatients || 0);
	}

	requestedPatients() {
		const list = [];
		if (this.model.requestedPatients) {
			for (let i = 0; i < this.model.requestedPatients; i++) {
				list.push({
					lastname: '',
					firstname: '',
					middlename: '',
					dob: null,
				});
			}
		}
		return list;
	}

	initForm(): void {
		this.myForm = new FormGroup({
			callerId: new FormControl(this.model.callerId || ''),
			fromPhone: new FormControl(this.model.fromPhone || ''),
			toPhone: new FormControl(this.model.toPhone || ''),
			areaId: new FormControl(this.model.areaId || null),
			advertisementSourceId: new FormControl(this.model.advertisementSourceId || ''),
			userId: new FormControl(this.model.userId),
			callerType: new FormControl(this.model.callerType.toString()),
			callTime: new FormControl(this.model.callTime),
			endTime: new FormControl(this.model.endTime),
			lastname: new FormControl(this.model.person?.lastname || ''),
			firstname: new FormControl(this.model.person?.firstname || ''),
			middlename: new FormControl(this.model.person?.middlename || ''),
			notes: new FormControl(this.model.notes || ''),
			confirmationCode: new FormControl(this.model.confirmationCode || ''),
		});
		this.myForm.valueChanges.subscribe(() => {
			const model = this.getModel();
			this._store.dispatch(
				CRMSearchActions.AddPhone({ key: 'call-from-phone', phone: model.fromPhone }),
			);
			this._store.dispatch(
				CRMSearchActions.AddLastname({ key: 'call-lastname', lastname: model.lastname }),
			);
			this._store.dispatch(
				CRMSearchActions.AddCallerId({ key: 'call-callerid', value: model.callerId }),
			);
		});
	}

	patientTitle(patient: any): string {
		if (!patient) {
			return 'Not Completed';
		}
		return personTitle(patient.person);
	}

	patientStatusTitle(patient: any): string {
		if (!patient) {
			return 'Not Completed';
		}
		return this._dropDownService.getName(patient.statusId, this.patientStatuses);
	}

	availablePatientStatuses() {
		// patient: any
		/* var item = this._dropDownService.getItem(patient.statusId, this.patientStatuses);
        if (item.orderNumber == PatientStatus.Prospective)
            return this._dropDownService.filterByOrderNumbers([PatientStatus.Prospective,
                PatientStatus.PendingIntakeCoordination], this.patientStatuses)
            .map(x => x.id); */
		return this.patientStatuses.map((x) => x.id);
	}

	checkListClass(status: CheckListItemStatus): string {
		return checkListClassName(status);
	}

	savePatient(i: number) {
		const model = this.getPatientModel(i);
		this.suppressMessages = true;
		this._store.dispatch(CallActions.SaveCallPatient({ model }));
	}

	allowToAddPatients(): boolean {
		return this.model.callerType === CallerType.Parent;
	}

	getPatientControl(_i: number) {
		// return this.myForm.get('requestedPatients').controls[i];
	}

	getPatientModel(_i: number) {
		// const control = this.getPatientControl(i);
		const result = {
			callId: this.model.id,
			patient: {
				// person: { ...control.value, id: Guid.EMPTY },
			},
		} as ICallPatientIndex;
		return result;
	}

	deletePatient() {
		this.suppressMessages = true;
		const model = this.getModel();
		model.requestedPatients = model.requestedPatients > 0 ? model.requestedPatients - 1 : null;
		this._store.dispatch(CallActions.UpdateCall({ call: model }));
	}

	endCall() {
		this.suppressMessages = true;
		this._store.dispatch(CallActions.EndCall({ callId: this.model.id }));
	}

	ngOnDestroy(): void {
		this.saveSubscription.unsubscribe();
		this._destroy$.next(null);
	}

	isNew() {
		return !this.model || this.model.callerType === CallerType.Unknown;
	}

	getCallerTypeName() {
		return this.callerTypes.filter((x) => x.id === this.model.callerType.toString())[0]!.name;
	}

	submit(): void {
		this.errors = null;
		const model = this.getModel();
		this._callService.updateModel(model).subscribe((result) => {
			// console.log(result);
			if (result.isSuccess === false) {
				this.errors = [result.error];
			} else {
				this.messages = ['Saved successfully'];
				setTimeout(() => (this.messages = null), 5000);
				this.confirmSave.emit();
			}
		});
	}

	formatCallTime(date: Date | null) {
		return formatDate(date!, 'MM/dd/yyyy hh:mm a', 'en-US');
	}

	getModel(): any {
		const { value } = this.myForm;
		/*      const result = {
            id: this.model.id,
            toPhone: value.toPhone,
            fromPhone: value.fromPhone,
            advertisementSourceId: null,
            callerId: value.callerId,
            callTime: this.model.callTime,
            callerType: value.callerType,
            areaId: value.areaId,
            endTime: this.model.endTime,
            userId: this.model.userId,
            requestedPatients: this.model.requestedPatients,
            person: {
                lastname: value.lastname,
                firstname: value.firstname,
                middlename: value.middlename
            }
        } as Call;
*/
		const result = {
			...this.model,
			...value,
			requestedPatients: this.model.requestedPatients,
			advertisementSourceId: null,
			callerType: parseInt(value.callerType, 10),
			person: {
				lastname: value.lastname,
				firstname: value.firstname,
				middlename: value.middlename,
			} as IPerson,
			patients: [],
		};

		return result;
	}
}
