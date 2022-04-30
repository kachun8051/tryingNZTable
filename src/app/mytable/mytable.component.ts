import { Component, OnInit } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataItem, ColumnItem, ColumnFilter } from '../mytable.model';

@Component({
  selector: 'app-mytable',
  templateUrl: './mytable.component.html',
  styleUrls: ['./mytable.component.css']
})

export class MytableComponent implements OnInit {

  http: HttpClient;
  isloaded: boolean;
  // custom variables
  listOfData: DataItem[];
  listOfNameFilter: ColumnFilter[];
  listOfAddrFilter: ColumnFilter[];
  // table required variables
  listOfColumns: ColumnItem[];

  constructor(http: HttpClient) { 
    this.isloaded = false;
    this.http = http;
    // custom variables
    this.listOfData = [];
    this.listOfNameFilter = [];
    this.listOfAddrFilter = [];   
    this.listOfColumns = [];
  }

  ngOnInit(): void {
    this.onload().then(
      () => {
        // table required variables
        
        this.listOfColumns = [
          {
            name: 'Name',
            sortOrder: null,
            sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
            listOfFilter: this.listOfNameFilter,
            filterFn: (list: string[], item: DataItem) => list.some(name => item.name.indexOf(name) !== -1)
          },
          {
            name: 'Age',
            sortOrder: null,
            sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
            listOfFilter: [],
            filterFn: null
          },
          {
            name: 'Address',
            sortFn: null,
            sortOrder: null,
            listOfFilter: this.listOfAddrFilter,
            filterFn: (address: string, item: DataItem) => item.address.indexOf(address) !== -1
          }
        ];
        this.isloaded = true;
      }
    );    
  }

  async httpcall(url: string, type: string): Promise<boolean> {

    await new Promise(
      resolve => {
        this.http.get<any>(url).subscribe(
          {
            next: (res) => {
              // console.log(res);
              switch (type){
                case 'otherusers':
                  console.log(type);
                  this.listOfData = res;
                  resolve(true);
                  break;
                case 'namefilters':
                  console.log(type);
                  this.listOfNameFilter = res;
                  resolve(true);
                  break;
                case 'addrfilters':
                  console.log(type);
                  this.listOfAddrFilter = res;
                  resolve(true);
                  break;
                default:
                  resolve(false);
                  break;
              }
            },
            error: (err) => {
              console.log("Server call (1) failed: " + err);
              //return false;
              resolve(false);
            }
          }
        );
      }
    );     
    
    return false;
  }

  // custom function added by wong ka chun
  async onload(): Promise<boolean> {
    // you should start the json-server first
    // C:\users\user\json-server>json-server data.json
    let myurl1 = "http://localhost:3000/otherusers";
    let myurl2 = "http://localhost:3000/namefilters";
    let myurl3 = "http://localhost:3000/addrfilters";
    let isloaded1: boolean = await this.httpcall(myurl1, 'otherusers');
    console.log('isloaded1: ' + isloaded1);
    let isloaded2: boolean = await this.httpcall(myurl2, 'namefilters');
    console.log('isloaded2: ' + isloaded2);
    let isloaded3: boolean = await this.httpcall(myurl3, 'addrfilters');
    console.log('isloaded3: ' + isloaded3);
    return (isloaded1 && isloaded2 && isloaded3 );
  }


  // listOfColumns: ColumnItem[] = 
  
  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }

  sortByAge(): void {
    this.listOfColumns.forEach(item => {
      if (item.name === 'Age') {
        item.sortOrder = 'descend';
      } else {
        item.sortOrder = null;
      }
    });
  }

  resetFilters(): void {
    this.listOfColumns.forEach(item => {
      if (item.name === 'Name') {
        item.listOfFilter = this.listOfNameFilter;
      } else if (item.name === 'Address') {
        item.listOfFilter = this.listOfAddrFilter;
      }
    });
  }

  resetSortAndFilters(): void {
    this.listOfColumns.forEach(item => {
      item.sortOrder = null;
    });
    this.resetFilters();
  }
}
