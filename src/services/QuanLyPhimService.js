import { GROUPID } from "../util/settings/config";
import { BaseServices } from "./baseService";


export class QuanLyPhimService extends BaseServices{
     constructor(){
        super()
     }

     layDanhSachBanner = () =>{
        return this.get(`api/QuanLyPhim/LayDanhSachBanner`);
     }
     layDanhSachPhim = (tenPhim='') =>{
        if(tenPhim===''){
           return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
        }
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
     }
     ThemPhimUploadHinh = (formData) =>{
      return this.post(`api/QuanLyPhim/ThemPhimUploadHinh`,formData)
     }
     LayThongTinPhim = (maPhim) =>{
      return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
     }
     CapNhatPhimUpload = (formData) =>{
      return this.post(`api/QuanLyPhim/CapNhatPhimUpload`,formData)
     }
     xoaPhim = (maPhim) =>{
       return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
     }
}

export const quanLyPhimService = new QuanLyPhimService();