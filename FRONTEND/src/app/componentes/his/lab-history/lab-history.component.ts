import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HisLabService } from 'src/app/services/his.lab.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-lab-history',
  templateUrl: './lab-history.component.html',
  styleUrls: ['./lab-history.component.css']
})

export class LabHistoryComponent implements OnInit {


  selectedIndex: number = -1;
  Fsearch: FormGroup;
  fullname = "";
  keyword = "";
  labItems$ = new BehaviorSubject([{ text: 'Item 1' }]);
  labOrders: any[] = [];
  // selectedIndex: number | null = null;
  dataLabHead: any[] = []; // ข้อมูลที่จะแสดงในตาราง
  DataVisitList: any[] = [];
  value = '';
  displayedColumns: string[] = [
    'lab_items_name_ref',
    'lab_order_result',
    'lab_items_normal_value_ref'
  ];

  constructor(
    private fb: FormBuilder,
    private labService: HisLabService,
    private alert: AlertService,
    private router: Router,
  ) {
    this.Fsearch = this.fb.group({
      keyword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  VisitList(event: Event): void{
    const keysearch = this.Fsearch.value['keyword'];
    this.labService.findVisitList(keysearch)
    .then((result) => {
      // console.log(result);   
      if(!result.length) return this.alert.openSnackBarEnd('ไม่พบข้อมูลที่ค้นหา');  
      this.DataVisitList = result;
      this.fullname = "HN: " + result[0].hn + " ชื่อ-สกุล " + result[0].fullname + " เพศ "+result[0].sex+" อายุ "+result[0].age_y+" ปี";
    })
    .catch(err => console.log(err))
    .finally(()=>{
      
    })
    
  }

  LabHead(event: Event, item: string, index: number): void {
    event.preventDefault();    
    this.selectedIndex = index;
    this.labService.findLabHead(item).then((result) => {      
      this.dataLabHead = result;
      console.log(result.length);
      
      if(result.length <= 0) this.alert.openSnackBar("ไม่มีรายการตรวจ");
    }).catch(err => { console.log(err) })
      .finally(()=>{
        
      });
  }

  onTabChanged(event: MatTabChangeEvent) {
    console.log(event);
    // ตรวจสอบว่า index อยู่ในช่วงของ array หรือไม่
    if (event.index >= 0 && event.index < this.dataLabHead.length) {
      const selectedItem = this.dataLabHead[event.index];
      // console.log('Lab Order Number:', selectedItem.lab_order_number);
      this.fetchDataLabOrder(selectedItem.lab_order_number);
    }   
  }

  fetchDataLabOrder(id:string): void{
    this.labService.findLabOrder(id)
    .then((result)=>{
      this.labOrders = result;
    })
    .catch()
    .finally()
  }

  // ตรวจสอบผลการตรวจว่าผิดปกติหรือไม่ 
  isAbnormalResult(item: any): boolean {
    
    /*if (item.lab_items_normal_value && item.lab_order_result) {
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
    }*/
   if(item.abnormal_result === "Y"){
    return true;
   }
    return false;
  }

  // ทำงานเมื่อผู้ใช้กดปุ่ม Esc 
  @HostListener('document:keydown.enter', ['$event'])
  handleEnter(event: KeyboardEvent): void {
    if (this.Fsearch.valid) {      
      event.preventDefault(); // ป้องกันการ submit form หากไม่ต้องการ
      this.VisitList(event);
      //console.log(this.Fsearch.value);
      
    }
    
  }

}
