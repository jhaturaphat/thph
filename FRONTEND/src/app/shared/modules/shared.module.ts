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
// Components
import { ContentComponent } from '../layout/content/content.component';
import { FooterMenuComponent } from '../layout/footer-menu/footer-menu.component';
import { SideBarComponent } from '../layout/side-bar/side-bar.component';


@NgModule({
    declarations: [
        ContentComponent,
        FooterMenuComponent,
        SideBarComponent
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
        // Module Angular
        ReactiveFormsModule
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
        // Module Angular
        ReactiveFormsModule,
        // component file
        ContentComponent,
        FooterMenuComponent,
        SideBarComponent  
    ],
    providers: [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
        { provide: LOCALE_ID, useValue: "th-TH" } //เพิ่ม LOCATE_ID เข้าไปครับ
    ]
})

export class SharedModule {}