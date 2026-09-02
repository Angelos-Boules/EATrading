import { Component, input, output } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  ColDef,
  GridOptions,
  ModuleRegistry,
  RowClickedEvent,
  RowSelectionOptions,
  SelectionChangedEvent,
  themeQuartz,
} from 'ag-grid-community';

// registers grid features once for the whole app on first import
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  imports: [AgGridAngular],
  selector: 'app-data-grid',
  standalone: true,
  styleUrl: './data-grid.css',
  templateUrl: './data-grid.html',
})
export class DataGrid<T = any> {
  columnDefs = input.required<ColDef<T>[]>();
  rowData = input<T[] | null>(null);
  gridOptions = input<GridOptions<T>>({});
  loading = input(false);
  defaultColDef = input<ColDef<T>>({ sortable: true, resizable: true, flex: 1, suppressMovable: false });
  rowSelection = input<RowSelectionOptions<T> | undefined>(undefined);

  rowClicked = output<RowClickedEvent<T>>();
  selectionChanged = output<SelectionChangedEvent<T>>();

  // zebra-striped rows with a light hover tint
  protected readonly theme = themeQuartz.withParams({
    oddRowBackgroundColor: 'rgba(0, 0, 0, 0.03)',
    rowHoverColor: 'rgba(0, 0, 0, 0.06)',
  });
}
