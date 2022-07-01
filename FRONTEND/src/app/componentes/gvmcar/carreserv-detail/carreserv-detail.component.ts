import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carreserv-detail',
  templateUrl: './carreserv-detail.component.html',
  styleUrls: ['./carreserv-detail.component.css']
})
export class CarreservDetailComponent implements OnInit {

  detail:any = "";
  constructor(
    private router: Router,
  ) {   
    this.detail = this.router.getCurrentNavigation()?.extras.state as any;
    if(!this.detail) this.router.navigate(['/gvmcar'])
    
   }

  ngOnInit(): void {
  }

}
