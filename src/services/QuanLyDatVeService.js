import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { GROUPID } from "../util/settings/config";
import { BaseServices } from "./baseService";


export class QuanLyDatVeService extends BaseServices{
     constructor(){
        super()
     }

    
     layDanhSachPhongVe = (maLichChieu) =>{
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
     }

     datVe = (thongTinDatVe = new ThongTinDatVe()) =>{
      return this.post(`api/QuanLyDatVe/DatVe`,thongTinDatVe)
     }

     taoLichChieu = (thongTinLichChieu) =>{
      return this.post(`api/QuanLyDatVe/TaoLichChieu`,thongTinLichChieu)
     }
    
}

export const quanLyDatVeService = new QuanLyDatVeService();