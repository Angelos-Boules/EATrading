import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Blocks access to authenticated-only routes until a session has been resolved. */
export const authGuard: CanActivateFn = async () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    while (auth.loading()) {
        await new Promise((resolve) => setTimeout(resolve, 20));
    }

    if (auth.session()) {
        return true;
    }

    return router.parseUrl('/');
};

/** Sends already-authenticated users straight to the home page instead of the landing page. */
export const guestGuard: CanActivateFn = async () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    while (auth.loading()) {
        await new Promise((resolve) => setTimeout(resolve, 20));
    }

    if (auth.session()) {
        return router.parseUrl('/home');
    }

    return true;
};
