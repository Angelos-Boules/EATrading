import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
    selector: 'app-json-viewer',
    standalone: true,
    imports: [FormsModule, JsonPipe],
    templateUrl: './json-viewer.html',
    styleUrl: './json-viewer.css',
})
export class JsonViewer implements OnInit {
    private readonly api = inject(ApiService);

    protected readonly path = signal('/api/users');
    protected readonly data = signal<unknown>(null);
    protected readonly error = signal<string | null>(null);
    protected readonly loading = signal(false);

    ngOnInit(): void {
        this.fetch();
    }

    fetch(): void {
        this.loading.set(true);
        this.error.set(null);
        this.data.set(null);

        this.api.get<unknown>(this.path()).subscribe({
            next: (response) => {
                this.data.set(response);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set(err?.message ?? 'Request failed');
                this.loading.set(false);
            },
        });
    }
}
