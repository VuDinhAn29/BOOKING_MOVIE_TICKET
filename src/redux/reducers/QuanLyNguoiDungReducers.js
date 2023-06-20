import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP_ACTION, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_LOAI_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, TIM_KIEM_USER } from "../actions/types/QuanLyNguoiDung";

let user = {};
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
    userLogin:user,
    thongTinNguoiDung: [],
    loaiNguoiDung:[],
    listUser:[],
}

export const QuanLyNguoiDungReducers = (state = initialState, action) => {
  switch (action.type) {

  case DANG_NHAP_ACTION: {
      const {thongTinDangNhap} = action;
    
      localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));
      localStorage.setItem(TOKEN,thongTinDangNhap.accessToken)

      return {...state,userLogin:thongTinDangNhap}
  }

  case SET_THONG_TIN_NGUOI_DUNG :{
    return {...state,thongTinNguoiDung:action.thongTinNguoiDung}
  }

  case SET_THONG_TIN_LOAI_NGUOI_DUNG:{
    return {...state,loaiNguoiDung:action.loaiNguoiDung}
  }

  case SET_DANH_SACH_NGUOI_DUNG:{
    return{...state,listUser:action.listUser}
  }

  case TIM_KIEM_USER:{
    return{...state,listUser:action.ketQuaTimKiem}
  }
 

  default:
    return state
  }
}


