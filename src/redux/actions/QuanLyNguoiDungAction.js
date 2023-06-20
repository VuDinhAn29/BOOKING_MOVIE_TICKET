import { history } from "../../App";
import { notifiFunction } from "../../components/Notification/Notification";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { DANG_KY_ACTION, DANG_NHAP_ACTION, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_LOAI_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, TIM_KIEM_USER } from "./types/QuanLyNguoiDung";

export const QuanLyNguoiDungAction = (thongTinDangNhap) =>{
      return async(dispatch)=>{
        try {
            const result = await quanLyNguoiDungService.dangnhap(thongTinDangNhap);
            // console.log('result123',result);
            if(result.status === 200){
                 dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content,
                 });
                //Chuyển hướng đăng nhập về trang trước đó
                history.push('/');
            }
        } catch (error) {
          console.log('error', error.response.data);
          notifiFunction('error', error.response?.data.content)
        }
      }
}

export const dangKyAction = (thongTinDangKy) =>{
  return async(dispatch)=>{
    try {
        const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
        // console.log('result123',result);
        if(result.status === 200){
             dispatch({
                type: DANG_KY_ACTION,
                thongTinDangNhap: result.data.content,
             });
             notifiFunction('success', 'Create user successfully !')
             history.push('/login');
        }
    } catch (error) {
        console.log('error', error.response.data);
        notifiFunction('error', error.response?.data.content)
    }
  }
}

export const layThongTinNguoiDungAction = () =>{
  return async(dispatch)=>{
    try {
        const result = await quanLyNguoiDungService.thongTinNguoiDung();
        // console.log('result123',result);
        if(result.status === 200){
             dispatch({
                type: SET_THONG_TIN_NGUOI_DUNG,
                thongTinNguoiDung: result.data.content,
             });
          
        }
    } catch (error) {
        console.log(error);
    }
  }
}


export const layDanhSachLoaiNguoiDungAction = () =>{
  return async(dispatch)=>{
    try {
        const result = await quanLyNguoiDungService.loaiNguoiDung();
        if(result.status === 200){
            dispatch({
                type: SET_THONG_TIN_LOAI_NGUOI_DUNG,
                loaiNguoiDung:result.data.content
              })
        }
       
    } catch (error) {
        console.log(error);
    }
  }
}

export const layDanhSachNguoiDungAction = () =>{
     return async (dispatch)=>{
      try {
        const result = await quanLyNguoiDungService.danhSachNguoiDung()
        if(result.status===200){
          dispatch({
            type: SET_DANH_SACH_NGUOI_DUNG,
            listUser: result.data.content
          })
        }
      } catch (error) {
        console.log('error', error.response.data);
      }
     }
}

export const capNhatNguoiDungAction = (thongTinNguoiDung) =>{
  return async(dispatch)=>{
    try {
        const result = await quanLyNguoiDungService.capNhatNguoiDung(thongTinNguoiDung);
        if(result.status === 200){
          notifiFunction('success', 'Update user successfully !')
        }
       
    } catch (error) {
      console.log('error', error.response.data);
      notifiFunction('error', error.response?.data.content)
      console.log('123'.error);
    }
  }
}

export const capNhatNguoiDungProfileAction = (thongTinNguoiDung) =>{
  return async(dispatch)=>{
    try {
        const result = await quanLyNguoiDungService.capNhatNguoiDungProfile(thongTinNguoiDung);
        if(result.status === 200){
          notifiFunction('success', 'Update user successfully !')
        }
       
    } catch (error) {
      console.log('error', error.response.data);
      notifiFunction('error', error.response?.data.content)
      console.log('123'.error);
    }
  }
}

export const xoaNguoiDungAction = (taiKhoan) =>{
  return async(dispatch)=>{
    try {
        const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
        if(result.status === 200){
          notifiFunction('success', 'Delete user successfully !')
          window.location.reload()
        }
       
    } catch (error) {
      console.log('error', error.response.data);
      notifiFunction('error', error.response?.data.content)
    }
  }
}

export const themNguoiDungAction = (dataUser) =>{
  return async(dispatch)=>{
    try {
        const result = await quanLyNguoiDungService.themNguoiDung(dataUser);
        // console.log('result',result);
        if(result.status === 200){
          notifiFunction('success', 'Create user successfully !')
          history.push('/admin/usermanager')
        }
        
       
    } catch (error) {
      console.log('error', error.response.data);
      notifiFunction('error', error.response?.data.content)
    }
  }
}


export const timKiemNguoiDungAction = (tuKhoa) =>{
  return async(dispatch)=>{
    try {
        const result = await quanLyNguoiDungService.searchUser(tuKhoa);
        // console.log('result',result);
        if(result.status === 200){
           dispatch({
              type: TIM_KIEM_USER,
              ketQuaTimKiem : result.data.content
           })
        }
        
       
    } catch (error) {
      console.log('error', error.response.data);
    }
  }
}

