import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * User information parsed from the API
 */
export interface User {
    id?: number;
    uuid?: string;
    name?: string | null;
    totalBalance?: number;
    [key: string]: unknown;
}

/**
 * Thin wrapper around HttpClient that prefixes every call with the configured
 * backend host. Change the host by editing `apiBaseUrl` in the environment
 * files under src/environments/ - nothing else needs to change.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = environment.apiBaseUrl;

    get<T>(path: string, params?: Record<string, string | number | boolean>): Observable<T> {
        return this.http.get<T>(this.buildUrl(path), { params: this.buildParams(params) });
    }

    post<T>(path: string, body: unknown): Observable<T> {
        return this.http.post<T>(this.buildUrl(path), body);
    }

    put<T>(path: string, body: unknown): Observable<T> {
        return this.http.put<T>(this.buildUrl(path), body);
    }

    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(this.buildUrl(path));
    }

    /**
     * Fetch users from the API
     */
    getUsers(): Observable<User[]> {
        return this.get<User[]>('/api/users');
    }

    /**
     * Fetch a single user by their numeric database ID
     */
    getUser(id: number): Observable<User> {
        return this.get<User>(`/api/users/${id}`);
    }

    /**
     * The backend only exposes users by numeric ID, not by Supabase auth UUID,
     * so match against the full list client-side.
     */
    getUserByUuid(uuid: string): Observable<User | undefined> {
        return new Observable((subscriber) => {
            this.getUsers().subscribe({
                next: (users) => {
                    subscriber.next(users.find((u) => u.uuid === uuid));
                    subscriber.complete();
                },
                error: (err) => subscriber.error(err),
            });
        });
    }

    private buildUrl(path: string): string {
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        return `${this.baseUrl}${normalizedPath}`;
    }

    private buildParams(params?: Record<string, string | number | boolean>): HttpParams {
        let httpParams = new HttpParams();
        for (const [key, value] of Object.entries(params ?? {})) {
            httpParams = httpParams.set(key, value);
        }
        return httpParams;
    }
}
