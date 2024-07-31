import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'page',
        loadChildren: () =>
          import('./page/page.module').then((m) => m.PageModule),
      },
    {path:'pages',loadChildren:()=> import('./page/page.module').then(m=>m.PageModule)}
];
