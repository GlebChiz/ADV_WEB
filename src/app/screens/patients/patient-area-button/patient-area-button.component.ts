import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { IDropDownData, LookupTypeCodes } from 'src/app/core/models/kendo/dropdown-data.model';
import { PatientGridService } from 'src/app/core/services/patient.service';
import { DropDownService } from 'src/app/shared/services/dropdown.service';

@Component({
	providers: [],
	selector: 'advenium-patient-area-button',
	templateUrl: './patient-area-button.component.html',
	styleUrls: ['./patient-area-button.component.scss'],
})
export class PatientAreaButtonComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	@Input() patientId!: Guid | null;

	@Input() areaId!: Guid | null | string;

	areas!: IDropDownData[];

	name: string | null = null;

	show = false;

	@Output() changePatient = new EventEmitter<any>();

	constructor(
		// private _store: Store<IAppState>,
		// private router: Router,
		private _dropDownService: DropDownService,
		private _patientService: PatientGridService,
	) {}

	ngOnInit(): void {
		this._dropDownService.getLookup(LookupTypeCodes.area).subscribe((x: any) => {
			this.areas = x.map((i: any) => ({ ...i, title: `${i.abbreviation} - ${i.name}` }));
			this.name = this.areaName();
			this.show = true;
		});
	}

	getAreas(): IDropDownData[] {
		return this.areas;
	}

	// ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next(null);
	}

	areaName(): string {
		const item = this._dropDownService.getItem(this.areaId!, this.areas);
		return item ? `${item.abbreviation} - ${item.name}` : 'None';
	}

	onItemClick(e: any): void {
		this._patientService.updateArea(this.patientId!, e.id).subscribe(() => {
			this.areaId = e.id;
			this.name = this.areaName();
			this.changePatient.emit({ patientId: this.patientId, areaId: e.id });
		});
	}
}
