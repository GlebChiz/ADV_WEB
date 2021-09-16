import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './shared/helpers';

const routes: Routes = [
	{
		path: '',
		loadChildren: (): any => import('./screens/home/home.module').then((m: any) => m.HomeModule),
		canActivate: [AuthGuard],
	},
	{
		path: 'login',
		loadChildren: (): any => import('./screens/login/login.module').then((m: any) => m.LoginModule),
	},

	{ path: '*', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
