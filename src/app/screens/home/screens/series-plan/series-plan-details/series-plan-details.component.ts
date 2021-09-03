/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { IDropdownData } from 'src/app/shared/interfaces/dropdown.interface';
import { IStore } from 'src/app/store';
import { DropdownActions } from 'src/app/store/actions/dropdowns.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	providers: [],
	selector: 'advenium-series-plan-details',
	templateUrl: './series-plan-details.component.html',
})
export class SeriesPlanDetailsComponent extends UnSubscriber implements OnInit {
	public constructor(private _activatedRoute: ActivatedRoute, private _store: Store<IStore>) {
		super();
	}

	public id = '';
	public title = '';

	ngOnInit(): void {
		this._store.dispatch(DropdownActions.GetSeriesPlansPending());
		this._activatedRoute.params.subscribe((params: Params) => {
			this.id = params.id || null;
			this._store.select('dropdown' as any, 'seriesPlans').subscribe((data: IDropdownData[]) => {
				const current: IDropdownData | undefined = data.find(
					(item: IDropdownData) => item.id === this.id,
				);
				if (current) {
					this.title = current.name;
				}
			});
		});
	}
}
