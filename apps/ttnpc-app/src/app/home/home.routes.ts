import { Routes } from "@angular/router";

export const HomeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home.component').then((x) => x.HomeComponent),
        title: 'All NPC\'s in one place | tiktoknpc.com'
    },
];