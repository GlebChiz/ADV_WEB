import { Component, OnInit } from '@angular/core';
import {
	ActivatedRoute,
	NavigationEnd,
	Params,
	PRIMARY_OUTLET,
	Router,
	UrlSegment,
} from '@angular/router';
import { filter } from 'rxjs/operators';

interface IBreadcrumb {
	params?: Params;
	url: string;
	text: string;
	icon?: string;
}

@Component({
	selector: 'advenium-home-breadcrumb',
	templateUrl: './home-breadcrumb.component.html',
})
export class HomeBreadcrumbComponent implements OnInit {
	public breadcrumbs: IBreadcrumb[];

	public constructor(private activatedRoute: ActivatedRoute, private router: Router) {
		this.breadcrumbs = [];
	}

	public ngOnInit(): void {
		this.router.events
			.pipe(filter((event: any) => event instanceof NavigationEnd))
			.subscribe(() => {
				const { root } = this.activatedRoute;
				this.breadcrumbs = this.getBreadcrumbs(root);
			});
	}

	private getBreadcrumbs(
		route: ActivatedRoute,
		url: string = '',
		breadcrumbs: IBreadcrumb[] = [],
	): IBreadcrumb[] {
		const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';

		const { children }: { children: ActivatedRoute[] } = route;

		if (children.length === 0) {
			return breadcrumbs;
		}

		// eslint-disable-next-line no-restricted-syntax
		for (const child of children) {
			if (child.outlet !== PRIMARY_OUTLET) {
				// eslint-disable-next-line no-continue
				continue;
			}

			// eslint-disable-next-line no-prototype-builtins
			if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
				return this.getBreadcrumbs(child, url, breadcrumbs);
			}

			const routeURL: string = child.snapshot.url
				.map((segment: UrlSegment) => segment.path)
				.join('/');
			url += `${routeURL}`;
			const breadcrumb: IBreadcrumb = {
				text: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
				params: child.snapshot.params,
				url,
			};
			if (child.snapshot.routeConfig?.data?.breadcrumb) {
				breadcrumbs.push(breadcrumb);
			}

			return this.getBreadcrumbs(child, url, breadcrumbs);
		}

		return breadcrumbs;
	}
}
