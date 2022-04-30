import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

interface DataItem {
    name: string;
    age: number;
    address: string;
  }
  
interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<DataItem> | null;
    listOfFilter: NzTableFilterList;
    filterFn: NzTableFilterFn<DataItem> | null;
  }

interface ColumnFilter {
    text: string;
    value: string;
}

export {DataItem, ColumnItem, ColumnFilter} 