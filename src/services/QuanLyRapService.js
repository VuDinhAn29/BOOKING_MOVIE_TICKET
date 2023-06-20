import { GROUPID } from "../util/settings/config";
import { BaseServices } from "./baseService";


export class QuanLyRapService extends BaseServices{
     constructor(){
        super()
     }

     layThongTinLichChieu = () =>{
        return this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
     }
     
     layThongTinLichChieuPhim = (maPhim) =>{
          return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
     }

     layThongTinHeThongRap = () =>{
         return this.get(`api/QuanLyRap/LayThongTinHeThongRap`)
     }

     layThongTinCumRap = (maHeThongRap) =>{
      return this.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
  }


}

export const quanLyRapService = new QuanLyRapService();