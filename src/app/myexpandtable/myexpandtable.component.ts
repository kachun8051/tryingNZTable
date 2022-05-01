import { Component, OnInit } from '@angular/core';
import { ParentItemData, ChildrenItemData } from '../mytable.model';

@Component({
  selector: 'app-myexpandtable',
  templateUrl: './myexpandtable.component.html',
  styleUrls: ['./myexpandtable.component.css']
})
export class MyexpandtableComponent implements OnInit {

  listOfParentData: ParentItemData[];
  listOfChildrenData: ChildrenItemData[][];

  constructor() { 
    this.listOfParentData = [];
    this.listOfChildrenData = [];
  }

  ngOnInit(): void {
    this.fillTheLists();
  }

  fillTheLists() {
    for (let i = 0; i < 3; ++i) {
      this.listOfParentData.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
        expand: false
      });
    }
    for(let j=0; j<3; ++j){
      let listTemp = [];
      for (let k = 0; k < 3; ++k) {
        listTemp.push({
          key: (j*10 + k),
          date: '2014-12-24 23:12:00',
          name: 'This is production name',
          upgradeNum: 'Upgraded: ' + (j*10+k)
        });
      }
      this.listOfChildrenData.push(listTemp);
    }    
  }
}
