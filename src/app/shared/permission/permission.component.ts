import { NgIfContext } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { PermissionType } from 'src/app/store/actions/user.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-permission',
	templateUrl: './permission.component.html',
})
export class PermissionsComponent extends UnSubscriber implements OnInit {
	@Input()
	public permissionType!: number | number[];

	@Input()
	public elseTemplate!: TemplateRef<NgIfContext<any>> | null;

	public isShow$!: Observable<boolean>;

	public constructor(private readonly store: Store<any>) {
		super();
	}

	public ngOnInit(): void {
		// if (Array.isArray(this.permissionType)) {
		// 	this.isShow$ = this.store.select('permissions').pipe(
		// 		concatAll(),
		// 		filter(({ permissionType }: any) => {
		// 			return this.permissionType === permissionType;
		// 		}),
		// 		takeUntil(this.unsubscribe$$),
		// 	);
		// 	return;
		// }

		this.isShow$ = this.store.select('userState', 'user', 'permissionTypes').pipe(
			map((permissionTypes: PermissionType[]) => {
				if (Array.isArray(this.permissionType)) {
					return (
						this.permissionType?.filter((item: number) => {
							return permissionTypes?.find((e: number) => e === item);
						}).length > 0
					);
				}

				return !!permissionTypes?.find(
					(numberPermission: PermissionType) => this.permissionType === numberPermission,
				);
			}),
			takeUntil(this.unsubscribe$$),
		);
	}
}
