export interface IGvmCarBrand {
    gvmcar_brand_id:number,
    gvmcar_brand_name:string
}

export interface IGvmCarType {
    gvmcar_type_id:number,
    gvmcar_type_name_th:string,
    gvmcar_type_name_en:string
}

export interface IGvmCarColor{
    gvmcar_color_id:number,
    gvmcar_color_name_th:string    
}

export interface IGvmCarStatus {
    gvmcar_status_id:number,
    gvmcar_status:string
}

export interface IGvmCarEmpDriving{
    gvmcar_emp_driver_id:number,
    gvmcar_emp_driving_pic:string
    gvmcar_emp_driver_fullname:string,
    gvmcar_emp_driver_nickname:string    
}

export interface IGvmCar{
    gvmcar_id:string,
    gvmcar_name:string,
    gvmcar_img:string,
    gvmcar_st_date:Date,
    gvmcar_who_care:number,
    gvmcar_brand__id:number,
    gvmcar_color_code:number,
    gvmcar_type_id:number,
    gvmcar_status_id:number
}

export interface IGvmCarRsv{
    gvmcar_rsv_id:number,
    gvmcar_rsv_num_of_ple:number,
    gvmcar_rsv_trip_job:string,
    gvmcar_rsv_trip_detail:string,    
    gvmcar_rsv_start_date:Date,
    gvmcar_rsv_end_date:Date,
    gvmcar_rsv_create_at?:Date,
    gvmcar_rsv_update_at?:Date,
    gvmcar_id:string,
    gvmcar_emp_driver_id:number
}