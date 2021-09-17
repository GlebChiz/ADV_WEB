import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStore } from 'src/app/store';
import { IUser, PermissionType } from 'src/app/store/actions/user.actions';
import { AuthenticationService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
	public constructor(
		public _store: Store<IStore>,
		private auth: AuthenticationService,
		private router: Router,
	) {}

	public canActivate(
		_route: ActivatedRouteSnapshot,
		_state: RouterStateSnapshot,
	): boolean | Observable<boolean> {
		return this.auth.checkToken().pipe(
			map((res: IUser) => {
				return this.checkPermissin(_state?.url?.substring(1), res.permissionTypes, _state);
			}),
		);
	}

	private checkPermissin(
		url: string,
		permissionTypes: number[],
		state: RouterStateSnapshot,
	): boolean {
		switch (url) {
			case 'payers':
				console.log(state, this.router);
				return this.findPermission(permissionTypes, PermissionType.canViewPayerManager);
			case 'groups':
				return this.findPermission(permissionTypes, PermissionType.canViewTherapyGroupManager);
			case 'locations':
				return this.findPermission(permissionTypes, PermissionType.canViewLocationManager);
			case 'modalities':
				return this.findPermission(permissionTypes, PermissionType.canViewModalityManager);
			case 'patientdistribution':
				return this.findPermission(
					permissionTypes,
					PermissionType.canViewPatientDistributionManager,
				);
			case 'patients':
				return this.findPermission(permissionTypes, PermissionType.canViewPatientManager);
			case 'seriesplans':
				return this.findPermission(permissionTypes, PermissionType.canViewSeriesPlanManager);
			case 'sessionplans':
				return this.findPermission(permissionTypes, PermissionType.canViewSessionPlanManager);
			case 'snipits':
				return this.findPermission(permissionTypes, PermissionType.canViewPublicSnipitManager);
			case 'supercred':
				return this.findPermission(
					permissionTypes,
					PermissionType.canViewSupervisorCredentialsManager,
				);
			case 'unsupervisedservices':
				return this.findPermission(
					permissionTypes,
					PermissionType.canViewUnsupervisedServiceManager,
				);
			case 'assessmentlegend':
				return this.findPermission(permissionTypes, PermissionType.canViewAssessmentLegendManager);
			case 'assessments':
				return this.findPermission(permissionTypes, PermissionType.canViewAssessmentManager);
			case 'clinicians':
				return this.findPermission(permissionTypes, PermissionType.canViewClinicianManager);
			default:
				return true;
		}
	}

	private findPermission(permissionTypes: number[], permissionType: PermissionType): boolean {
		return !!permissionTypes?.find(
			(numberPermission: number) => numberPermission === permissionType,
		);
	}
}
