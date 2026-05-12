import { Routes } from '@angular/router';
import { UrlFormComponent } from './components/url-form/url-form.component';

export const routes: Routes = [{
    path:'',
    component: UrlFormComponent
},
{
    path:'urls',
    loadComponent:() => import('./components/url-list/url-list.component').then(m => m.UrlListComponent)
}];

