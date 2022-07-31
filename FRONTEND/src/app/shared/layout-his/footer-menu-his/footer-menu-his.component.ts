import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer-menu-his',
  templateUrl: './footer-menu-his.component.html',
  styleUrls: ['./footer-menu-his.component.css']
})
export class FooterMenuHisComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }
  onToggleSidenav = () => {
    this.sidenavToggle.emit(); // Emit event to parent component so it can open/close sidenav
  };

}
