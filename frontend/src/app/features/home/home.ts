import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [DecimalPipe],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {
    protected readonly auth = inject(AuthService);
    private readonly router = inject(Router);

    async logout(): Promise<void> {
        await this.auth.signOut();
        this.router.navigateByUrl('/');
    }
}
