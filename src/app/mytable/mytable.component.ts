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
  //listOfNameFilter2: ColumnFilter[];
  //listOfAddrFilter2: ColumnFilter[];
  // table required variables
  listOfColumns: ColumnItem[];

  constructor(http: HttpClient) { 
    this.isloaded = false;
    this.http = http;
    // custom variables
    this.listOfData = [];
    this.listOfNameFilter = [];
    this.listOfAddrFilter = []; 
    //this.listOfNameFilter2 = [];
    //this.listOfAddrFilter2 = [];  
    this.listOfColumns = [];
  }

  ngOnInit(): void {
    this.onload();
  }

  onload(): void {
    this.fetchdata().then(
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
    let ret: boolean = false;
    await new Promise(
      resolve => {
        
        this.http.get<any>(url).subscribe(
          {
            next: (res) => {
              // console.log(res);
              switch (type){
                case 'otherusers':
                  console.log('type: '+type);
                  this.listOfData = res;
                  ret = true;
                  resolve(true);
                  break;
                case 'namefilters':
                  console.log('type: '+type);
                  this.listOfNameFilter = res;
                  //this.listOfNameFilter2 = res;
                  ret = true;
                  resolve(true);
                  break;
                case 'addrfilters':
                  console.log('type: '+type);
                  this.listOfAddrFilter = res;
                  //this.listOfAddrFilter2 = res;
                  ret = true;
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
    
    return ret;
  }

  // custom function added by wong ka chun
  async fetchdata(): Promise<boolean> {
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
  /*
  watchIt(): void {
    this.listOfColumns.forEach(item => {
      if (item.name === 'Name') {

      }
    });
  }
  */

  resetFilters(): void {
    //this.isloaded = false;
    this.listOfColumns.forEach(item => {
      //console.log('resetFilters: ' + item);
      if (item.name === 'Name') {
        console.log('resetFilters 1 (Name): ' + this.listOfNameFilter.length);
        this.listOfNameFilter.forEach(
          elem => {
            console.log("text1: " + elem.text + ", value1: " + elem.value );
          }
        );
        console.log("Json1: " + JSON.stringify(this.listOfNameFilter));
        item.listOfFilter.forEach(
          //console.log('resetFilters 2 (Name): ');
          elem => {
            console.log("text2: " + elem.text + ", value2: " + elem.value );
          }
        );
        console.log("Json2: " + JSON.stringify(item.listOfFilter));
        //console.log('text: ');
        //item.listOfFilter = [];
        item.listOfFilter = this.listOfNameFilter;
        //this.isloaded = true;
      } else if (item.name === 'Address') {
        console.log('resetFilters (Address): ' + this.listOfAddrFilter.length);
        this.listOfAddrFilter.forEach(
          elem => {
            console.log("text: " + elem.text + ", value: " + elem.value );
          }
        );
        item.listOfFilter = this.listOfAddrFilter;
        //this.isloaded = true;
      }
    });
  }

  resetSortAndFilters(): void {
    
    this.listOfColumns.forEach(item => {
      //console.log('resetSortAndFilters: ' + item);
      item.sortOrder = null;
    });
    this.resetFilters();
  }
}
