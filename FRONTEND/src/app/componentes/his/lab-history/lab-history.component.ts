import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  dataSource: any[] = []; // ข้อมูลที่จะแสดงในตาราง
  value = '';
  displayedColumns: string[] = [
    'lab_items_name',
    'lab_order_result',
    'lab_items_normal_value',
    'lab_items_group_name'
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

  findKeyword(event: Event): void{
    const keysearch = this.Fsearch.value['keyword'];
    this.labService.findLabOrder(keysearch)
    .then((result) => {
      console.log(result);
      this.labOrders = result;
      this.fullname = "HN: " + result[0].hn + " ชื่อ-สกุล " + result[0].fullname;
    })
    .catch(err => console.log(err))
    .finally(()=>{
      if(this.labOrders){
        this.labService.findLabResult(this.labOrders[0].lab_order_number).then((result) => {      
          this.dataSource = result;
        }).catch(err => { console.log(err) })
          .finally();
      }
    })
    
  }

  findLabItem(event: Event, item: string, index: number): void {
    event.preventDefault();
    // this.ActiveList = !this.ActiveList;
    // console.log(event.target);
    // อัปเดต selectedIndex เป็น index ของรายการที่ถูกคลิก
    this.selectedIndex = index;
    this.labService.findLabResult(item).then((result) => {      
      this.dataSource = result;
    }).catch(err => { console.log(err) })
      .finally();
  }


  isAbnormalResult(item: any): boolean {
    // ตรวจสอบผลการตรวจว่าผิดปกติหรือไม่ 
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

  // ทำงานเมื่อผู้ใช้กดปุ่ม Esc 
  @HostListener('document:keydown.enter', ['$event'])
  handleEnter(event: KeyboardEvent): void {
    if (this.Fsearch.valid) {      
      event.preventDefault(); // ป้องกันการ submit form หากไม่ต้องการ
      this.findKeyword(event);
      //console.log(this.Fsearch.value);
      
    }
    
  }

}
