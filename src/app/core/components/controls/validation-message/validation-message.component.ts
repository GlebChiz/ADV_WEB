import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ValidationMessageService } from 'src/app/core/services/validation.message.service';

@Component({
	providers: [],
	selector: 'advenium-validation-message',
	templateUrl: './validation-message.component.html',
})
export class ValidationMessageComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject();

	errors: string[] | null = null;

	messages: string[] | null = null;

	subscription!: Subscription;

	@Input() service!: ValidationMessageService;

	// constructor() {}

	ngOnInit(): void {
		if (this.service) {
			this.subscription = this.service
				.subscriptionToMessages()
				.subscribe((value) => this.activate(value));
		}
	}

	// ngOnChanges(): void {}

	ngOnDestroy(): void {
		this._destroy$.next();
	}

	private activate(value: any) {
		if (value) {
			if (value.isValid === true) {
				this.showMessages(value.values);
			}
			if (value.isValid === false) {
				this.showErrors(value.values);
			}
		}
	}

	private showErrors(values: string[]) {
		this.errors = values;
		setTimeout(() => (this.errors = null), 5000);
	}

	private showMessages(values: string[]) {
		this.messages = values;
		setTimeout(() => (this.messages = null), 5000);
	}
}
