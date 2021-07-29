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
	selector: 'advenium-patient-area-button',
	templateUrl: './patient-area-button.component.html',
	styleUrls: ['./patient-area-button.component.scss'],
})
export class PatientAreaButtonComponent implements OnInit, OnChanges, OnDestroy {
	private _destroy$ = new Subject();

	@Input() patientId!: Guid;

	@Input() areaId!: Guid | null;

	areas!: DropDownData[];

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
		this._dropDownService.getLookup(LookupTypeCodes.area).subscribe((x) => {
			this.areas = x.map((i) => ({ ...i, title: `${i.abbreviation} - ${i.name}` }));
			this.name = this.areaName();
			this.show = true;
		});
	}

	getAreas(): DropDownData[] {
		return this.areas;
	}

	ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	areaName(): string {
		const item = this._dropDownService.getItem(this.areaId!, this.areas);
		return item ? `${item.abbreviation} - ${item.name}` : 'None';
	}

	onItemClick(e: any): void {
		this._patientService.updateArea(this.patientId, e.id).subscribe((x) => {
			this.areaId = e.id;
			this.name = this.areaName();
			this.change.emit({ patientId: this.patientId, areaId: e.id });
		});
	}
}
