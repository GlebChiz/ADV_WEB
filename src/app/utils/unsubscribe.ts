/* eslint-disable max-classes-per-file */
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export type Constructable = new (...args: any[]) => {};
export type ConstructableForMixin = new (...args: any[]) => {
	ngOnDestroy(): void;
};
@Injectable()
export class UnSubscriber implements OnDestroy {
	protected unsubscribe$$ = new Subject();

	public ngOnDestroy(): void {
		this.unsubscribe$$.next(true);
		this.unsubscribe$$.complete();
	}
}

// eslint-disable-next-line
export function UnSubscriberMixin<BC extends ConstructableForMixin>(Base: BC) {
	return class extends Base {
		public unsubscribe$$ = new Subject();

		public ngOnDestroy(): void {
			this.unsubscribe$$.next(true);
			this.unsubscribe$$.complete();
			super.ngOnDestroy();
		}
	};
}
