import { OnDestroy, Directive } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class UnsubscriableBaseDirective implements OnDestroy {
	unsubscribe = new Subject<void>();

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
