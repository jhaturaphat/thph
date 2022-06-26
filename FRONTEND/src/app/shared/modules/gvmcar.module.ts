import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CarReserveComponent } from "src/app/componentes/gvmcar/car-reserve/car-reserve.component";
import { GvmCarRoutingModule } from "../route/gvmcar-routing.module";
import { SharedModule } from "./shared.module";

@NgModule({
    declarations:[
        CarReserveComponent
    ],
    imports:[
        CommonModule,
        GvmCarRoutingModule,
        SharedModule
    ],
    exports:[
        CarReserveComponent        
    ]
})

export class GvmCarModule {}