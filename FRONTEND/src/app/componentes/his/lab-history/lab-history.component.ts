import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HisLabService } from 'src/app/services/his.lab.service';
import { AlertService } from 'src/app/shared/services/alert.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-lab-history',
  templateUrl: './lab-history.component.html',
  styleUrls: ['./lab-history.component.css']
})

export class LabHistoryComponent implements OnInit {

    ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  fullname = "";
  labItems$ = new BehaviorSubject([{ text: 'Item 1' }]);
  labOrders:any[] = [];
  selectedIndex: number | null = null;
  dataSource: any[] = []; // ข้อมูลที่จะแสดงในตาราง
  displayedColumns: string[] = [
    'lab_items_name', 
    'lab_order_result', 
    'lab_items_normal_value',
    'lab_items_group_name'
  ];

  constructor(
      private fb:FormBuilder, 
      private labService:HisLabService,
      private alert:AlertService,
      private router:Router,    
      ) {}
     
  ngOnInit(): void {
    this.labService.findLabOrder('000088973')
    .then((result)=>{
      console.log(result);      
      this.labOrders = result;
      this.fullname = "HN: "+result[0].hn+" ชื่อ-สกุล "+result[0].fullname;
    })
    .catch(err=>console.log(err))
    .finally()
  }

  findLabItem(event:Event, item:string, index: number): void{
    event.preventDefault();
    this.labService.findLabResult(item).then((result)=>{
      // console.log(result);
      this.dataSource = result;
      
    }).catch(err=>{console.log(err)})
    .finally();
  }

  isAbnormalResult(item: any): boolean {
    // ตรวจสอบผลการตรวจว่าผิดปกติหรือไม่ (ตัวอย่างเท่านั้น)
    if (item.lab_items_normal_value && item.lab_order_result) {
      if (item.lab_items_normal_value.startsWith('<')) {
        const normalValue = parseFloat(item.lab_items_normal_value.substring(1));
        const resultValue = parseFloat(item.lab_order_result);
        return !isNaN(resultValue) && resultValue >= normalValue;
      }
      else if (item.lab_items_normal_value.startsWith('>')) {
        const normalValue = parseFloat(item.lab_items_normal_value.substring(1));
        const resultValue = parseFloat(item.lab_order_result);
        return !isNaN(resultValue) && resultValue <= normalValue;
      }
      else if (item.lab_order_result !== item.lab_items_normal_value) {
        return true;
      }
    }
    return false;
  }

}
