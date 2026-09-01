import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { Home } from './features/home/home';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: Landing, canActivate: [guestGuard] },
    { path: 'home', component: Home, canActivate: [authGuard] },
    { path: '**', redirectTo: '' },
];
