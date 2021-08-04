import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionType } from 'src/app/core/enums/permission.type';
import { CacheSection, IUser } from 'src/app/core/models/user.model';
import { DataService } from 'src/app/shared/services';

@Injectable({ providedIn: 'root' })
export class MenuService extends DataService {
	public _destroy$(_destroy$: any): any {
		throw new Error('Method not implemented.');
	}

	public constructor(http: HttpClient) {
		super(http, 'menu');
	}

	public resetCache(section: CacheSection): Observable<any> {
		return this.put(`${section}/reset-cache`);
	}

	public getMainMenu(user: IUser): IMainMenu[] {
		const menu: IMainMenu[] = this.createMainMenu();
		menu.forEach((x: IMainMenu) => this.validateMenu(x, user));
		return menu;
	}

	private validateMenu(menuItem: any, user: IUser): void {
		if (menuItem.items) {
			menuItem.items.forEach((x: any) => this.validateMenu(x, user));
		}
		menuItem.isVisible = user?.sharedCallId
			? false
			: this.isMenuVisible(menuItem, user.permissions);
	}

	private isMenuVisible(menuItem: any, permissions: PermissionType[]): boolean {
		const isPermitted: boolean =
			!menuItem.permissionType || permissions?.includes(menuItem.permissionType);
		if (menuItem.items && menuItem.items.length > 0) {
			const isChildVisible: boolean =
				menuItem.items.filter((x: any) => x.isVisible === true).length > 0;
			return isChildVisible && isPermitted;
		}
		return isPermitted;
	}

	private createMainMenu(): IMainMenu[] {
		const mainMenu: IMainMenu[] = [
			{
				text: 'Administration',
				items: [
					{ text: 'Reset Cache', path: 'reset', cssClass: '', permissionType: null },
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
					{ text: 'Users', path: 'users', cssClass: '', permissionType: null },
				],
				cssClass: '',
			},
			{
				text: 'Calls',
				items: [
					{
						text: 'New Call',
						path: 'new-call',
						permissionType: PermissionType.CanViewNewCall,
						cssClass: '',
					},
					{
						text: 'Active Call',
						path: 'active-call',
						permissionType: PermissionType.CanViewActiveCall,
						cssClass: '',
					},
					{
						text: 'My Calls',
						path: 'my-calls',
						permissionType: PermissionType.CanViewMyCalls,
						cssClass: '',
					},
				],
				cssClass: '',
			},
		];
		return mainMenu;
	}
}

export interface IMainMenu {
	text: string;
	items: IMainMenuItem[];
	cssClass: string;
}

export interface IMainMenuItem {
	text: string;
	path: string;
	permissionType: number | null;
	cssClass: string;
}
