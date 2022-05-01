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

interface ParentItemData {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number | string;
  creator: string;
  createdAt: string;
  expand: boolean;
}

interface ChildrenItemData {
  key: number;
  name: string;
  date: string;
  upgradeNum: string;
}

export {DataItem, ColumnItem, ColumnFilter, ParentItemData, ChildrenItemData} 