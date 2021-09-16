import { NgIfContext } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { PermissionType, RoleType } from 'src/app/store/actions/user.actions';
import { UnSubscriber } from 'src/app/utils/unsubscribe';

@Component({
	selector: 'advenium-permission',
	templateUrl: './permission.component.html',
})
export class PermissionsComponent extends UnSubscriber implements OnInit {
	@Input()
	public permissionType!: number | number[];

	@Input()
	public roles!: number | number[];

	@Input()
	public elseTemplate!: TemplateRef<NgIfContext<any>> | null;

	public isShowByPermission$!: Observable<boolean>;

	public isShowByRole$!: Observable<boolean>;

	public constructor(private readonly store: Store<any>) {
		super();
	}

	public ngOnInit(): void {
		this.isShowByPermission$ = this.store.select('userState', 'user', 'permissionTypes').pipe(
			map((permissionTypes: PermissionType[]) => {
				if (this.permissionType) {
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
				}
				return true;
			}),
			takeUntil(this.unsubscribe$$),
		);

		this.isShowByRole$ = this.store.select('userState', 'user', 'roleTypes').pipe(
			map((roleTypes: RoleType[]) => {
				if (this.roles) {
					if (Array.isArray(this.roles)) {
						return (
							this.roles?.filter((item: number) => {
								return roleTypes?.find((e: number) => e === item);
							}).length > 0
						);
					}
					return !!roleTypes?.find((numberRole: RoleType) => this.roles === numberRole);
				}
				return true;
			}),
			takeUntil(this.unsubscribe$$),
		);
	}
}
