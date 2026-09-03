import { Component, Input } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AllCommunityModule, ModuleRegistry, AgChartOptions, PieSeriesModule } from 'ag-charts-community';

ModuleRegistry.registerModules([AllCommunityModule, PieSeriesModule]);
@Component({
  standalone: true,
  imports: [AgCharts],
  selector: 'app-pie-chart',
  styleUrls: ['./pie-chart.css'],
  templateUrl: './pie-chart.html',
})
export class PieChartComponent {
  public chartOptions: AgChartOptions = {
    title: {
      text: 'Pie Chart Example',
      fontSize: 18,
    },
    series: [
      ({
        type: 'pie',
        labelKey: 'label',
        angleKey: 'value',
      } as any)
    ]
  };
  @Input()
  public set data(value: any[] | undefined) {
    if (!value) return;
    // replace chartOptions object so AgCharts picks up the change
    this.chartOptions = {
      ...this.chartOptions,
      data: value,
    } as AgChartOptions;
  }
}