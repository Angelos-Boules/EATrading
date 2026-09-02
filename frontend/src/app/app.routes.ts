import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { ClientDashboard } from './features/dashboard/client-dashboard/client-dashboard';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: Landing, canActivate: [guestGuard] },
    { path: 'dashboard', component: ClientDashboard, canActivate: [authGuard] },
    { path: '**', redirectTo: '' },
];
