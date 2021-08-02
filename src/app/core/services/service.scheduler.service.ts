import { Guid } from 'guid-typescript';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ISchedulerViewModel, IService, ISchedulerFilter } from 'src/app/core/models/service.model';
import { DataService } from 'src/app/shared/services/data.service';

export interface IServiceSchedulerService {
	loadView: (filter: ISchedulerFilter) => Observable<ISchedulerViewModel>;
	getServiceModel: (id: Guid, filter: ISchedulerFilter) => Observable<any>;
	getNewServiceModel: (start: Date, end: Date, filter: ISchedulerFilter) => Observable<any>;
	deleteService: (id: Guid) => Observable<any>;
	createService: (service: IService) => Observable<any>;
	updateService: (service: IService) => Observable<any>;
	subscriptionToSaving: () => Observable<IService | null>;
}

export abstract class ServiceSchedulerService
	extends DataService
	implements IServiceSchedulerService
{
	private saveSubscription = new BehaviorSubject<IService | null>(null);

	subscriptionToSaving(): Observable<IService | null> {
		return this.saveSubscription.asObservable();
	}

	// constructor(http: HttpClient, controller: string) {
	// 	super(http, controller);
	// }

	sendToSave(service: IService) {
		if (service) {
			this.saveSubscription.next(service);
		}
	}

	deleteService(id: Guid): Observable<any> {
		const url = `${id}/delete-service`;
		return this.post(url);
	}

	getNewServiceModel(start: Date, end: Date, filter: ISchedulerFilter): Observable<any> {
		const filterId = Guid.create();
		const createServiceModel = {
			data: filter,
			start,
			end,
		};
		const url = `${filterId}/new-service-model`;
		return this.saveFilterData('save-service-data', filterId, createServiceModel).pipe(
			switchMap(() => this.get(url)),
		);
	}

	getServiceModel(id: Guid, filter: ISchedulerFilter): Observable<any> {
		const filterId = Guid.create();
		const editServiceModel = {
			data: filter,
			id,
		};
		const url = `${filterId}/service-model`;
		return this.saveFilterData('save-service-data', filterId, editServiceModel).pipe(
			switchMap(() => this.get(url)),
		);
	}

	saveSchedulerFilter(filterId: Guid, filter: any): Observable<any> {
		return this.saveFilterData('save-scheduler-filter', filterId, filter);
	}

	createService(service: IService): Observable<any> {
		return this.post('create-service', service);
	}

	updateService(service: IService): Observable<any> {
		return this.post('update-service', service);
	}

	loadView(filter: ISchedulerFilter): Observable<ISchedulerViewModel> {
		const filterId = Guid.create();
		const url = `${filterId}/get-scheduler-view`;
		return this.saveSchedulerFilter(filterId, filter).pipe(
			switchMap(() => this.get<ISchedulerViewModel>(url)),
		);
	}
}
