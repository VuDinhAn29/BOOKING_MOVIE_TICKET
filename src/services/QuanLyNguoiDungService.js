import { GROUPID } from "../util/settings/config";
import { BaseServices } from "./baseService";


export class QuanLyNguoiDungService extends BaseServices{
     constructor(){
        super()
     }

    
     dangnhap = (thongTinDangNhap) =>{
        return this.post(`api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap)
     }

     dangKy = (thongTinDangKy) =>{
       return this.post(`api/QuanLyNguoiDung/DangKy`,thongTinDangKy)
     }

     thongTinNguoiDung = () =>{
      return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }

    loaiNguoiDung = () =>{
      return this.get(`api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }

    danhSachNguoiDung = () =>{
      return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    }

    capNhatNguoiDung = (thongTinNguoiDung) =>{
      return this.post(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,thongTinNguoiDung)
    }

    capNhatNguoiDungProfile = (thongTinNguoiDung) =>{
      return this.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,thongTinNguoiDung)
    }

    searchUser = (taikhoan) =>{
      return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${taikhoan}`)
    }

    xoaNguoiDung = (taikhoan) =>{
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taikhoan}`)
    }

    themNguoiDung = (dataUser) =>{
      return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`,dataUser)
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();