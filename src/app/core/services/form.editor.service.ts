import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';

@Injectable({ providedIn: 'root' })
export class FormEditorService extends DataService {
	changed = false;

	private reloadFormSubscription = new BehaviorSubject<any>(null);
	/*
  private saveSubscription = new BehaviorSubject<EditingForm>(null);
  subscriptionToSaving() : Observable<EditingForm> {
    return this.saveSubscription.asObservable();
  } */

	subscriptionToReload(): Observable<any> {
		return this.reloadFormSubscription.asObservable();
	}

	constructor(http: HttpClient) {
		super(http, 'form');
	}
	/*
  sendToSave(form: EditingForm) {
    if (form) {
      this.saveSubscription.next(form);
    }
  } */

	reload() {
		this.reloadFormSubscription.next(null);
		this.changed = false;
	}
}
