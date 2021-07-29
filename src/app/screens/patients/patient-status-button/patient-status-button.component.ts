import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { DropDownData, LookupTypeCodes } from 'src/app/core/models/kendo/dropdown-data.model';
import { PatientGridService } from 'src/app/core/services/patient.service';
import { IAppState } from 'src/app/core/store/state/app.state';
import { DropDownService } from 'src/app/shared/services/dropdown.service';

@Component({
	providers: [],
	selector: 'advenium-patient-status-button',
	templateUrl: './patient-status-button.component.html',
	styleUrls: ['./patient-status-button.component.scss'],
})
export class PatientStatusButtonComponent implements OnInit, OnChanges, OnDestroy {
	private _destroy$ = new Subject();

	@Input() patientId!: Guid;

	@Input() statusId!: Guid | null;

	@Input() availableStatuses!: Guid[] | null;

	patientStatuses!: DropDownData[];

	name: string | null = null;

	show = false;

	@Output() change = new EventEmitter<any>();

	constructor(
		private _store: Store<IAppState>,
		private router: Router,
		private _dropDownService: DropDownService,
		private _patientService: PatientGridService,
	) {}

	ngOnInit(): void {
		this._dropDownService
			.getLookup(LookupTypeCodes.patientStatus)
			.subscribe((x: DropDownData[]) => {
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

	getStatuses(): DropDownData[] {
		const list = this.patientStatuses.filter((x) => this.isAvailable(x));
		return list;
	}

	ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	statusName(): string {
		const name = this._dropDownService.getName(this.statusId, this.patientStatuses);
		return name === '' ? 'None' : name;
	}

	onItemClick(e: any): void {
		this._patientService.updateStatus(this.patientId, e.id).subscribe((x) => {
			this.statusId = e.id;
			this.name = this.statusName();
			this.change.emit({ patientId: this.patientId, statusId: e.id });
		});
	}
}
