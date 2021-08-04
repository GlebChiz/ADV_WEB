import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ValidationMessageService {
	private messageSubscription = new BehaviorSubject<any>(null);

	public subscriptionToMessages(): Observable<any> {
		return this.messageSubscription.asObservable();
	}

	// constructor() {}

	public clear(): void {
		this.display(null, false);
		this.display(null, true);
	}

	public display(values: string[] | null, isValid: boolean): void {
		this.messageSubscription.next({
			values,
			isValid,
		});
	}

	public displayResponse(response: any): void {
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
