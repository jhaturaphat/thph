// https://dev-reboot.com/pwa-navigation/

import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';


import { FlexLayoutModule } from '@angular/flex-layout';

// material modules
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

import {CdkTableModule} from '@angular/cdk/table';

// Components
import { ContentComponent } from '../layout/content/content.component';
import { FooterMenuComponent } from '../layout/footer-menu/footer-menu.component';
import { SideBarComponent } from '../layout/side-bar/side-bar.component';
import { DashboardComponent } from 'src/app/componentes/dashboard/dashboard.component';
//layout-his
// import { ContentHisComponent } from '../layout-his/content-his/content-his.component';
// import { FooterMenuHisComponent } from '../layout-his/footer-menu-his/footer-menu-his.component';
// import { SideBarHisComponent } from '../layout-his/side-bar-his/side-bar-his.component';


@NgModule({
    declarations: [
        // App Layout
        ContentComponent,
        FooterMenuComponent,
        SideBarComponent,        
        //Component
        DashboardComponent    
    ],
    imports: [
        RouterModule,
        CommonModule,
        HttpClientModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatButtonModule,
        MatListModule,       
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatBadgeModule,
        MatGridListModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule,
        CdkTableModule,
        // Module Angular
        ReactiveFormsModule,        
    ],
    exports: [
        RouterModule,
        CommonModule,
        HttpClientModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatButtonModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatBadgeModule,
        MatGridListModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule,
        CdkTableModule,     
        // Module Angular
        ReactiveFormsModule,        
        // component file
        ContentComponent,
        FooterMenuComponent,
        SideBarComponent,
        DashboardComponent,
        //HIS
    ],
    providers: [       
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
        { provide: LOCALE_ID, useValue: "th-TH" } //เพิ่ม LOCATE_ID เข้าไปครับ
    ]
})

export class SharedModule {}