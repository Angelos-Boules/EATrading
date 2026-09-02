import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService, User } from '../../../core/services/api.service';
import { StockSearch } from './components/stock-search/stock-search';
import { PortfolioTableComponent } from '../components/portfolio-table/portfolio-table';
import { PortfolioTable } from '../interfaces/portfolio-table.interface';
type ClientDashboardTab = 'portfolio' | 'orders';

const MOCK_PORTFOLIO: PortfolioTable[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 12, value: 2271.84, allocation: 30, dayChange: 3.42, overallReturn: 0 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 5, value: 891.05, allocation: 15, dayChange: 7.32, overallReturn: 0 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 3, value: 1246.8, allocation: 20, dayChange: -1.23, overallReturn: 0 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 8, value: 971.2, allocation: 20, dayChange: 23.4, overallReturn: 0 },
    { symbol: 'TSLA', name: 'Tesla Inc.', shares: 4, value: 955.6, allocation: 15, dayChange: -2.30, overallReturn: 0 },
];

@Component({
  imports: [DecimalPipe, StockSearch, PortfolioTableComponent],
  selector: 'app-client-dashboard',
  standalone: true,
  styleUrl: './client-dashboard.css',
  templateUrl: './client-dashboard.html',
})
export class ClientDashboard implements OnInit {
  protected readonly auth = inject(AuthService);
      private readonly router = inject(Router);
      private readonly api = inject(ApiService);
  
      protected readonly account = signal<User | null>(null);
      protected readonly loadingAccount = signal(false);
  
      protected readonly activeTab = signal<ClientDashboardTab>('portfolio');
      protected readonly portfolioHoldings = computed(() =>
          [...MOCK_PORTFOLIO].sort((a, b) => a.symbol.localeCompare(b.symbol)),
      );
  
      ngOnInit(): void {
          this.fetchAccount();
      }
  
      setTab(tab: ClientDashboardTab): void {
          this.activeTab.set(tab);
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
  