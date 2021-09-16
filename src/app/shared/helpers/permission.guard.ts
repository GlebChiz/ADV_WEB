import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { IUser, PermissionType } from 'src/app/store/actions/user.actions';
import { AuthenticationService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
	public constructor(public _store: Store<IStore>, private auth: AuthenticationService) {}

	public canActivate(
		_route: ActivatedRouteSnapshot,
		_state: RouterStateSnapshot,
	): boolean | Observable<boolean> {
		return this.auth.checkToken().pipe(
			map((res: IUser) => {
				return this.checkPermissin(_state?.url?.substring(1), res.permissionTypes);
			}),
		);
	}

	public checkPermissin(url: string, permissionTypes: number[]): boolean {
		let currentPermission: number | undefined;
		switch (url) {
			case 'payers':
				currentPermission = permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});

				if (currentPermission) {
					return true;
				}
				return false;
			case 'groups':
				currentPermission = permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});
				if (currentPermission) {
					return true;
				}
				return false;
			case 'locations':
				currentPermission = permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});
				if (currentPermission) {
					return true;
				}
				return false;
			case 'modalities':
				currentPermission = permissionTypes?.find((numberPermission: number) => {
					return numberPermission === 123123123;
				});
				if (currentPermission) {
					return true;
				}
				return false;
			case 'patientdistribution':
				currentPermission = permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});
				if (currentPermission) {
					return true;
				}
				return false;
			case 'patients':
				currentPermission = permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});
				if (currentPermission) {
					return true;
				}
				return false;
			case 'seriesplans':
				currentPermission = permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});
				if (currentPermission) {
					return true;
				}
				return false;
			case 'sessionplans':
				currentPermission = permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});
				if (currentPermission) {
					return true;
				}
				return false;
			case 'snipits':
				currentPermission = permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});
				if (currentPermission) {
					return true;
				}
				return false;
			case 'supercred':
				currentPermission = permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});
				if (currentPermission) {
					return true;
				}
				return false;
			case 'unsupervisedservices':
				currentPermission = permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});
				if (currentPermission) {
					return true;
				}
				return false;
			case 'assessmentlegend':
				currentPermission = permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});
				if (currentPermission) {
					return true;
				}
				return false;
			case 'assessments':
				currentPermission = permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});
				if (currentPermission) {
					return true;
				}
				return false;
			case 'clinicians':
				currentPermission = permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});
				if (currentPermission) {
					return true;
				}
				return false;
			default:
				return true;
		}
	}
}
