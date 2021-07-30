import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IService } from '../models/service.model';
import { ServiceSchedulerService } from './service.scheduler.service';

@Injectable({ providedIn: 'root' })
export class IntakeSchedulerService extends ServiceSchedulerService {
	constructor(http: HttpClient) {
		super(http, 'intake');
	}

	getIntakeServices(patientIds: (Guid | null)[]): Observable<IService[]> {
		const filterId = Guid.create();
		const filter = {
			patientIds,
		};
		const url = `${filterId}/get-services`;
		return this.saveFilterData('save-scheduler-filter', filterId, filter).pipe(
			switchMap(() => this.get(url)),
		);
	}
}
/*
export class IntakeService extends DataService {
  constructor(http: HttpClient) {
    super(http, 'intake');
  }

  getNewServiceModel(start: Date, end: Date, filter: IIntakeSchedulerFilter): Observable<IEditingService> {
    const filterId = Guid.create();
    const filterModel = {
      ...filter,
      serviceStart: start,
      serviceEnd: end,
      serviceId: null
    };
    const url = `${filterId}/new-service-model`;
    return this.saveSchedulerFilter(filterId, filterModel)
        .pipe(switchMap(response =>
                this.get(url)
        ));
  }

  deleteService(id: Guid): Observable<any> {
    const url = `${id}/delete`;
    return this.delete(url);
  }

  getNewServiceModel(start: Date, end: Date, filter: IIntakeSchedulerFilter): Observable<IEditingService> {
    const filterId = Guid.create();
    const filterModel = {
      ...filter,
      serviceStart: start,
      serviceEnd: end,
      serviceId: null
    };
    const url = `${filterId}/new-service-model`;
    return this.saveSchedulerFilter(filterId, filterModel)
        .pipe(switchMap(response =>
                this.get(url)
        ));
  }

  getServiceModel(id: Guid, filter: IIntakeSchedulerFilter): Observable<IEditingService> {
    const filterId = Guid.create();
    const filterModel = {
      ...filter,
      serviceId: id
    };
    const url = `${filterId}/service-model`;
    return this.saveSchedulerFilter(filterId, filterModel)
        .pipe(switchMap(response =>
                this.get(url)
        ));
  }

  getSchedulerModel(patientIds: Guid[]): Observable<IIntakeSchedulerModel> {
    if (!patientIds) {
      return of({} as IIntakeSchedulerModel);
    }
    const filterId = Guid.create();
    const filter = {
      patientIds: patientIds
    };
    const url = `${filterId}/get-scheduler`;
    return this.saveSchedulerFilter(filterId, filter)
        .pipe(switchMap(response =>
                this.get(url)
        ));
  }

  saveSchedulerFilter(filterId: Guid, filter: any): Observable<any> {
    return this.saveFilterData('save-scheduler-filter', filterId, filter);
  }

  createService(service: Service): Observable<any> {
    return this.post('create', service);
  }

  updateService(service: Service): Observable<any> {
    return this.put('update', service);
  }

  getViewModel(filter: any): Observable<ISchedulerViewModel> {
    const filterId = Guid.create();
    const url = `${filterId}/get-view`;
    return this.saveSchedulerFilter(filterId, filter)
        .pipe(switchMap(response =>
                this.get(url)
        ));
  }
}
*/
