import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { combineLatest, Subject } from 'rxjs';
import { DropDownData } from 'src/app/core/models/kendo/dropdown-data.model';
import { EditingService, ServiceFieldsSettings } from 'src/app/core/models/service.model';
import { addTimezone, fixDate, removeTimezone } from 'src/app/shared/services/date.utils';
import { DropDownService } from 'src/app/shared/services/dropdown.service';

@Component({
	providers: [],
	selector: 'advenium-service-editor-form',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './service.editor.form.component.html',
})
export class ServiceEditorFormComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	active = false;

	isNew = false;

	editForm!: FormGroup;

	@Input() fields!: ServiceFieldsSettings;

	@Input() editableFields!: string[];

	@Input() displayedFields!: string[];

	patientLookup!: DropDownData[];

	clinicianLookup!: DropDownData[];

	serviceTypeLookup!: DropDownData[];

	statusLookup!: DropDownData[];

	deliveryTypeLookup!: DropDownData[];

	@Output() valueChanged: EventEmitter<any> = new EventEmitter();

	@Input() set event(ev: EditingService) {
		if (ev) {
			this.patientLookup = ev.patientLookup;
			this.serviceTypeLookup = ev.serviceTypeLookup;
			this.clinicianLookup = ev.clinicianLookup;
			fixDate(ev, 'start');
			fixDate(ev, 'end');
			const value = {
				...ev,
				start: ev.start,
				end: ev.end,
				deliveryType: ev.deliveryType.toString(),
				status: ev.status.toString(),
			};
			this.isNew = ev.id.toString() === Guid.EMPTY;
			if (this.isNew === true) {
				this.sendValue(value);
			}
			this.initForm({ ...value, start: addTimezone(value.start), end: addTimezone(value.end) });
			this.editForm.valueChanges.subscribe((x) => {
				this.sendValue({ ...x, start: removeTimezone(x.start), end: removeTimezone(x.end) });
			});
		}
	}

	sendValue(value: any) {
		this.valueChanged.emit(value);
	}

	get event(): EditingService {
		return this.editForm.value;
	}

	constructor(private formBuilder: FormBuilder, private _dropDownService: DropDownService) {}

	initForm(value: any) {
		if (this.editForm) {
			this.editForm.reset(value);
			return;
		}
		this.editForm = new FormGroup({
			id: new FormControl({ value: '', disabled: !value.canEdit }),
			title: new FormControl({ value: '', disabled: !value.canEdit }),
			start: new FormControl({ value: '', disabled: !value.canEdit }),
			end: new FormControl({ value: '', disabled: !value.canEdit }),
			patientId: new FormControl({ value: '', disabled: !value.canEdit }),
			clinicianId: new FormControl({ value: '', disabled: !value.canEdit }),
			status: new FormControl({ value: '', disabled: !value.canEdit }),
			serviceTypeId: new FormControl({ value: '', disabled: !value.canEdit }),
			deliveryType: new FormControl({ value: '', disabled: !value.canEdit }),
			unitType: new FormControl({ value: '', disabled: !value.canEdit }),
			units: new FormControl({ value: '', disabled: !value.canEdit }),
		});
		this.editForm.reset(value);
		combineLatest([
			this._dropDownService.getServiceDeliveryTypes(),
			this._dropDownService.getServiceStatuses(),
		]).subscribe(([xTypes, xStatuses]) => {
			this.deliveryTypeLookup = xTypes;
			this.statusLookup = xStatuses;
			this.active = true;
		});
	}

	isEditable(field: string): boolean {
		if (field === 'patientId' && !this.patientLookup) {
			return false;
		}
		if (field === 'clinicianId' && !this.clinicianLookup) {
			return false;
		}
		return this.editableFields && this.editableFields.includes(field);
	}

	isDisplayed(field: string): boolean {
		return !this.displayedFields || this.displayedFields.includes(field) || this.isEditable(field);
	}

	/* onSave(e: MouseEvent): void {
        e.preventDefault();
        this.active = false;
        const value = {...this.editForm.value};
        value.start = removeTimezone(value.start);
        value.end = removeTimezone(value.end);
        this.save.emit(value);
    } */

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}
}
