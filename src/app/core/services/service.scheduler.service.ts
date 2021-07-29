import { HttpClient } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SchedulerViewModel, Service, SchedulerFilter } from 'src/app/core/models/service.model';
import { DataService } from 'src/app/shared/services/data.service';

export interface IServiceSchedulerService {
	loadView: (filter: SchedulerFilter) => Observable<SchedulerViewModel>;
	getServiceModel: (id: Guid, filter: SchedulerFilter) => Observable<any>;
	getNewServiceModel: (start: Date, end: Date, filter: SchedulerFilter) => Observable<any>;
	deleteService: (id: Guid) => Observable<any>;
	createService: (service: Service) => Observable<any>;
	updateService: (service: Service) => Observable<any>;
	subscriptionToSaving: () => Observable<Service>;
}

export abstract class ServiceSchedulerService
	extends DataService
	implements IServiceSchedulerService
{
	private saveSubscription = new BehaviorSubject<Service>(null);

	subscriptionToSaving(): Observable<Service> {
		return this.saveSubscription.asObservable();
	}

	constructor(http: HttpClient, controller: string) {
		super(http, controller);
	}

	sendToSave(service: Service) {
		if (service) {
			this.saveSubscription.next(service);
		}
	}

	deleteService(id: Guid): Observable<any> {
		const url = `${id}/delete-service`;
		return this.post(url);
	}

	getNewServiceModel(start: Date, end: Date, filter: SchedulerFilter): Observable<any> {
		const filterId = Guid.create();
		const createServiceModel = {
			data: filter,
			start,
			end,
		};
		const url = `${filterId}/new-service-model`;
		return this.saveFilterData('save-service-data', filterId, createServiceModel).pipe(
			switchMap((response) => this.get(url)),
		);
	}

	getServiceModel(id: Guid, filter: SchedulerFilter): Observable<any> {
		const filterId = Guid.create();
		const editServiceModel = {
			data: filter,
			id,
		};
		const url = `${filterId}/service-model`;
		return this.saveFilterData('save-service-data', filterId, editServiceModel).pipe(
			switchMap((response) => this.get(url)),
		);
	}

	saveSchedulerFilter(filterId: Guid, filter: any): Observable<any> {
		return this.saveFilterData('save-scheduler-filter', filterId, filter);
	}

	createService(service: Service): Observable<any> {
		return this.post('create-service', service);
	}

	updateService(service: Service): Observable<any> {
		return this.post('update-service', service);
	}

	loadView(filter: SchedulerFilter): Observable<SchedulerViewModel> {
		const filterId = Guid.create();
		const url = `${filterId}/get-scheduler-view`;
		return this.saveSchedulerFilter(filterId, filter).pipe(switchMap((response) => this.get(url)));
	}
}
