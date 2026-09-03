import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService, User } from '../../../core/services/api.service';
import { StockSearch } from './components/stock-search/stock-search';
import { PortfolioTableComponent } from '../components/portfolio-table/portfolio-table';
import { PortfolioTable } from '../interfaces/portfolio-table.interface';
import { OrdersTable } from '../interfaces/orders-table.interface';
import { OrdersTableComponent } from '../components/orders-table/orders-table';
type ClientDashboardTab = 'portfolio' | 'orders';

const MOCK_PORTFOLIO: PortfolioTable[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 12, value: 2271.84, allocation: 30, dayChange: 3.42, overallReturn: 0 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 5, value: 891.05, allocation: 15, dayChange: 7.32, overallReturn: 0 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 3, value: 1246.8, allocation: 20, dayChange: -1.23, overallReturn: 0 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 8, value: 971.2, allocation: 20, dayChange: 23.4, overallReturn: 0 },
    { symbol: 'TSLA', name: 'Tesla Inc.', shares: 4, value: 955.6, allocation: 15, dayChange: -2.30, overallReturn: 0 },
];

const MOCK_ORDERS: OrdersTable[] = [
    {
        action: 'BUY',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        transactionDate: new Date('2024-01-15'),
        shares: 10,
        price: 190.5,
        instrument: 'STOCK',
        status: 'PENDING',
    },
    {
        action: 'SELL',
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        transactionDate: new Date('2024-01-20'),
        shares: 2,
        price: 238.9,
        instrument: 'STOCK',
        status: 'PENDING',
    },
    {
        action: 'BUY',
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        transactionDate: new Date('2024-01-25'),
        shares: 3,
        price: 3200.0,
        instrument: 'STOCK',
        status: 'PENDING',
    },
    {
        action: 'SELL',
        symbol: 'MSFT',
        name: 'Microsoft Corp.',
        transactionDate: new Date('2024-01-30'),
        shares: 1,
        price: 415.0,
        instrument: 'STOCK',
        status: 'PENDING',
    }
];

@Component({
  imports: [DecimalPipe, StockSearch, PortfolioTableComponent, OrdersTableComponent],
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
    protected readonly orderHistory = computed(() => 
        [...MOCK_ORDERS].sort((a, b) => b.transactionDate.getTime() - a.transactionDate.getTime()),
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
  