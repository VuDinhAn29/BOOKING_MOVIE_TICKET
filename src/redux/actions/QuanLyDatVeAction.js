import { connection } from "../..";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType";


export const layChiTietPhongVeAction = (maLichChieu) =>{
      return async(dispatch) =>{
         try {
            const result = await quanLyDatVeService.layDanhSachPhongVe(maLichChieu);
            // console.log('123a',result);
            if(result.status===200){
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe:result.data.content
                })
            }
         } catch (error) {
            console.log(error);
         }
      }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) =>{
      return async(dispatch,getState) =>{
         try {

            dispatch(displayLoadingAction)

             const result = await quanLyDatVeService.datVe(thongTinDatVe);
            //  console.log(result.data.content);
             //Đặt vé thành công gọi api load lại phòng vé
             await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
             await dispatch({type:DAT_VE_HOAN_TAT})
             
             await dispatch(hideLoadingAction)

             let userLogin = getState().QuanLyNguoiDungReducers.userLogin;
             connection.invoke('datGheThanhCong', userLogin.taiKhoan, thongTinDatVe.maLichChieu);

             dispatch({
               type: CHUYEN_TAB
             })

         } catch (error) {
            dispatch(displayLoadingAction)
            console.log(error);
         }
      }
}

export const datGheAction = (ghe, maLichChieu) => {


   return async (dispatch, getState) => {

       //Đưa thông tin ghế lên reducer
       await dispatch({
           type: DAT_VE,
           gheDuocChon: ghe
       });

       //Call api về backend 
       let danhSachGheDangDat = getState().QuanLyDatVeReducers.danhSachGheDangDat;
       let taiKhoan = getState().QuanLyNguoiDungReducers.userLogin.taiKhoan;

       // console.log('danhSachGheDangDat',danhSachGheDangDat);
       // console.log('taiKhoan',taiKhoan);
       // console.log('maLichChieu',maLichChieu);
       //Biến mảng thành chuỗi
       danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

       //Call api signalR
       connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu);




   }

}