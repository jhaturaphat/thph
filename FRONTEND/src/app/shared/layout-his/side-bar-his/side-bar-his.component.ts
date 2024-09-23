import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-side-bar-his',
  templateUrl: './side-bar-his.component.html',
  styleUrls: ['./side-bar-his.component.css']
})
export class SideBarHisComponent implements OnInit {

  @Output() sideNavClosed = new EventEmitter();
  constructor(
    private router: Router,
    private login:LoginService 
    ) {}

  ngOnInit(): void {
  }

  onAbout() {
    this.router.navigateByUrl('/about');
    this.sideNavClosed.emit(); // Emit event to parent component so it can tell sidenav to close
  }
  onLogout(){
    this.login.clearToken();
    this.router.navigateByUrl('/login');
  }

}
