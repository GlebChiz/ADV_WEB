import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionType } from 'src/app/core/enums/permission.type';
import { CacheSection, IUser } from 'src/app/core/models/user.model';
import { DataService } from 'src/app/shared/services';
import { AuthenticationService } from './authentification.service';

@Injectable({ providedIn: 'root' })
export class MenuService extends DataService {
	_destroy$(_destroy$: any): any {
		throw new Error('Method not implemented.');
	}

	constructor(
		http: HttpClient,
		// private _store: Store<IAppState>,
		private _auth: AuthenticationService,
	) {
		super(http, 'menu');
	}

	resetCache(section: CacheSection): Observable<any> {
		return this.put(`${section}/reset-cache`);
	}

	getMainMenu() {
		const menu = this.createMainMenu();
		const user = this._auth.getCurrentUser();
		menu.forEach((x) => this.validateMenu(x, user));
		return menu;
	}

	private validateMenu(menuItem: any, user: IUser) {
		if (menuItem.items) {
			menuItem.items.forEach((x: any) => this.validateMenu(x, user));
		}
		menuItem.isVisible = user?.sharedCallId
			? false
			: this.isMenuVisible(menuItem, user.permissions);
	}

	private isMenuVisible(menuItem: any, permissions: PermissionType[]) {
		const isPermitted = !menuItem.permissionType || permissions.includes(menuItem.permissionType);
		if (menuItem.items && menuItem.items.length > 0) {
			const isChildVisible = menuItem.items.filter((x: any) => x.isVisible === true).length > 0;
			return isChildVisible && isPermitted;
		}
		return isPermitted;
	}

	private createMainMenu() {
		return [
			{
				text: 'Administration',
				items: [
					{ text: 'Reset Cache', path: 'reset', cssClass: '' },
					{
						text: 'Patients',
						path: 'patients',
						permissionType: PermissionType.CanViewPatientList,
						cssClass: '',
					},
					{
						text: 'Clinicians',
						path: 'clinicians',
						permissionType: PermissionType.CanViewClinicianList,
						cssClass: '',
					},
					{
						text: 'Payers',
						path: 'payers',
						permissionType: PermissionType.CanViewPayerList,
						cssClass: '',
					},
					{ text: 'Users', path: 'users', cssClass: '' },
				],
				cssClass: '',
			},
			{
				text: 'Calls',
				items: [
					{ text: 'New Call', path: 'new-call', permissionType: PermissionType.CanViewNewCall },
					{
						text: 'Active Call',
						path: 'active-call',
						permissionType: PermissionType.CanViewActiveCall,
					},
					{ text: 'My Calls', path: 'my-calls', permissionType: PermissionType.CanViewMyCalls },
				],
				cssClass: '',
			},
		];
	}
}
