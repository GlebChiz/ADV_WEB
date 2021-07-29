import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';
import { PersonAvailability, PersonAvailabilityFilter } from '../models/availability.model';

@Injectable({ providedIn: 'root' })
export class PersonAvailabilityService extends DataService {
	constructor(http: HttpClient) {
		super(http, 'PersonAvailability');
	}

	loadEvents(filter: PersonAvailabilityFilter): Observable<SchedulerEvent[]> {
		const filterId = Guid.create();
		const url = `${filterId}/get-scheduler`;
		return this.saveFilterData('save-filter', filterId, filter).pipe(
			switchMap((response) => this.get(url)),
		);
	}

	createAvailability(availability: PersonAvailability): Observable<any> {
		return this.post('create', availability);
	}

	updateAvailability(availability: PersonAvailability): Observable<any> {
		return this.post(`update`, availability);
	}

	updateAvailabilityList(availabilities: PersonAvailability[]): Observable<any> {
		return this.post(`updateList`, availabilities);
	}

	deleteAvailability(id: Guid): Observable<any> {
		return this.post(`${id}/delete`);
	}
}
