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
		switch (url) {
			case 'payers':
				return !!permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});
			case 'groups':
				return !!permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});
			case 'locations':
				return !!permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});
			case 'modalities':
				return !!permissionTypes?.find((numberPermission: number) => {
					return numberPermission === 123123123;
				});
			case 'patientdistribution':
				return !!permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});

			case 'patients':
				return !!permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});

			case 'seriesplans':
				return !!permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});

			case 'sessionplans':
				return !!permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});

			case 'snipits':
				return !!permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});

			case 'supercred':
				return !!permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});

			case 'unsupervisedservices':
				return !!permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});

			case 'assessmentlegend':
				return !!permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});

			case 'assessments':
				return !!permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});

			case 'clinicians':
				return !!permissionTypes?.find((numberPermission: number) => {
					return numberPermission === PermissionType.canViewAssessmentLegendManager;
				});

			default:
				return true;
		}
	}
}
