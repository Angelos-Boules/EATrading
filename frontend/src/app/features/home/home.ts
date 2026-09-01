import { Component, OnInit, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ApiService, User } from '../../core/services/api.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [DecimalPipe],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home implements OnInit {
    protected readonly auth = inject(AuthService);
    private readonly router = inject(Router);
    private readonly api = inject(ApiService);

    protected readonly account = signal<User | null>(null);
    protected readonly loadingAccount = signal(false);

    ngOnInit(): void {
        this.fetchAccount();
    }

    private fetchAccount(): void {
        const userId = this.auth.user()?.id;
        if (!userId) {
            return;
        }

        this.loadingAccount.set(true);
        this.api.getUserByUuid(userId).subscribe({
            next: (account) => {
                this.account.set(account ?? null);
                this.loadingAccount.set(false);
            },
            error: (err) => {
                console.error('Error fetching account:', err);
                this.loadingAccount.set(false);
            },
        });
    }

    async logout(): Promise<void> {
        await this.auth.signOut();
        this.router.navigateByUrl('/');
    }
}
