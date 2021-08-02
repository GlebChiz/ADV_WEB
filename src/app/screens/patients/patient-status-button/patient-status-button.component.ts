import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { IDropDownData, LookupTypeCodes } from 'src/app/core/models/kendo/dropdown-data.model';
import { PatientGridService } from 'src/app/core/services/patient.service';
import { DropDownService } from 'src/app/shared/services/dropdown.service';

@Component({
	providers: [],
	selector: 'advenium-patient-status-button',
	templateUrl: './patient-status-button.component.html',
	styleUrls: ['./patient-status-button.component.scss'],
})
export class PatientStatusButtonComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	@Input() patientId!: Guid | null;

	@Input() statusId!: Guid | null;

	@Input() availableStatuses!: Guid[] | null;

	patientStatuses!: IDropDownData[];

	name: string | null = null;

	show = false;

	@Output() manuallyChange = new EventEmitter<any>();

	constructor(
		// private _store: Store<IAppState>,
		// private router: Router,
		private _dropDownService: DropDownService,
		private _patientService: PatientGridService,
	) {}

	ngOnInit(): void {
		this._dropDownService
			.getLookup(LookupTypeCodes.patientStatus)
			.subscribe((x: IDropDownData[]) => {
				this.patientStatuses = x;
				this.name = this.statusName();
				this.show = true;
			});
	}

	private isAvailable(item: any): boolean {
		if (!this.availableStatuses || this.availableStatuses.length === 0) {
			return true;
		}
		return this.availableStatuses.includes(item.id);
	}

	getStatuses(): IDropDownData[] {
		const list = this.patientStatuses.filter((x) => this.isAvailable(x));
		return list;
	}

	// ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	statusName(): string {
		const name = this._dropDownService.getName(this.statusId!, this.patientStatuses);
		return name === '' ? 'None' : name;
	}

	onItemClick(e: any): void {
		this._patientService.updateStatus(this.patientId!, e.id).subscribe(() => {
			this.statusId = e.id;
			this.name = this.statusName();
			this.manuallyChange.emit({ patientId: this.patientId, statusId: e.id });
		});
	}
}
