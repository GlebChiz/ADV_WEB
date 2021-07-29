import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { UnsubscriableBaseDirective } from 'src/app/core/components/unsubscriable.base.directive';
import { AvailabilityStatus, PersonAvailability } from 'src/app/core/models/availability.model';
import { DropDownData } from 'src/app/core/models/kendo/dropdown-data.model';
import { MetaData } from 'src/app/core/models/patient.model';
import { IAppState } from 'src/app/core/store/state/app.state';
import { removeTimezone } from 'src/app/shared/services/date.utils';
import { DropDownService } from 'src/app/shared/services/dropdown.service';

@Component({
	providers: [],
	selector: 'advenium-person-availability-editor',
	templateUrl: './person-availability-editor.component.html',
})
export class PersonAvailabilityEditorComponent
	extends UnsubscriableBaseDirective
	implements OnInit, OnDestroy
{
	readonly filterSettings: DropDownFilterSettings = {
		caseSensitive: false,
		operator: 'contains',
	};

	@Input() model!: PersonAvailability;

	@Output() valueChanged: EventEmitter<any> = new EventEmitter();

	availabilityForm!: FormGroup;

	statusLookup = Array<DropDownData>();

	metaData: any = MetaData;

	constructor(public _store: Store<IAppState>, private _dropDownService: DropDownService) {
		super();
	}

	ngOnInit(): void {
		this.statusLookup = [
			{
				id: AvailabilityStatus.Available.toString(),
				name: 'Available',
			} as DropDownData,
			{
				id: AvailabilityStatus.Possible.toString(),
				name: 'Possible',
			} as DropDownData,
		];

		this.initForm();

		this.availabilityForm.valueChanges.subscribe((x) => {
			x.startTime = removeTimezone(x.startTime);
			x.endTime = removeTimezone(x.endTime);
			this.valueChanged.emit(x);
		});
	}

	initForm(): void {
		this.availabilityForm = new FormGroup({
			startDate: new FormControl(new Date(this.model.startDate)),
			endDate: new FormControl(this.model.endDate ? new Date(this.model.endDate) : null),
			startTime: new FormControl(new Date(this.model.startTime)),
			endTime: new FormControl(new Date(this.model.endTime)),
			status: new FormControl(this.model.status.toString()),
		});
	}
}
