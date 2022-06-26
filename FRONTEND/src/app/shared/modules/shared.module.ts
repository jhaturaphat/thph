// https://dev-reboot.com/pwa-navigation/

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
        MatInputModule
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
        // component file
        ContentComponent,
        FooterMenuComponent,
        SideBarComponent  
    ],
    providers: [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
    ]
})

export class SharedModule {}