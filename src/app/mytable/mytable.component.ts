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
    this.onload();
  }

  onload(): void {
    this.fetchdata().then(
      () => {
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
                  ret = true;
                  resolve(true);
                  break;
                case 'addrfilters':
                  console.log('type: '+type);
                  this.listOfAddrFilter = res;
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
    let myloaded = true;
    let url = "http://localhost:3000/";
    let urls = ["otherusers", "namefilters", "addrfilters"];

    let i = 0;
    for (i = 0; i<urls.length; i++){
      let myurl = url + urls[i];
      let isloaded: boolean = await this.httpcall(myurl, urls[i]);
      myloaded = myloaded && isloaded;
      console.log('isloaded (' + urls[i] + '): ' + isloaded);
    }
    return myloaded;
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

  resetFilters(): void {
    //this.isloaded = false;
    this.listOfColumns.forEach( async item => {
      //console.log('resetFilters: ' + item);
      if (item.name === 'Name') {
        // fetch the namefilters again from server        
        let isloaded: boolean = await this.httpcall("http://localhost:3000/namefilters", "namefilters");
        item.listOfFilter = this.listOfNameFilter;
      } else if (item.name === 'Address') {
        console.log('resetFilters (Address): ' + this.listOfAddrFilter.length);
        this.listOfAddrFilter.forEach(
          elem => {
            console.log("text: " + elem.text + ", value: " + elem.value );
          }
        );
        // fetch the addrfilters again from server        
        let isloaded: boolean = await this.httpcall("http://localhost:3000/addrfilters", "addrfilters");
        item.listOfFilter = this.listOfAddrFilter;
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
