import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
    {
        path: '',
        loadChildren: () => import('./home/home.routes').then((x) => x.HomeRoutes),
        title: 'plm'
    }
];
