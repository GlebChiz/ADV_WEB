import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ValidationMessageService {
	private messageSubscription = new BehaviorSubject<any>(null);

	subscriptionToMessages(): Observable<any> {
		return this.messageSubscription.asObservable();
	}

	// constructor() {}

	clear() {
		this.display(null, false);
		this.display(null, true);
	}

	display(values: string[] | null, isValid: boolean) {
		this.messageSubscription.next({
			values,
			isValid,
		});
	}

	displayResponse(response: any) {
		if ((response.isValid === true || response.isSuccess === true) && response.message) {
			this.display([response.message], true);
		} else if ((response.isValid === false || response.isSuccess === false) && response.error) {
			this.display([response.error], false);
		} else if ((response.isValid === false || response.isSuccess === false) && response.errors) {
			this.display(response.errors, false);
		} else if ((response.isValid === true || response.isSuccess === true) && response.messages) {
			this.display(response.messages, true);
		}
	}
}
