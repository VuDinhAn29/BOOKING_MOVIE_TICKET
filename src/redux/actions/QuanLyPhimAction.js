
import { history } from "../../App";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_FILM } from "./types/QuanLyPhimType";



export const layDanhSachPhimAction = (tenPhim='') =>{
    return async (dispatch) =>{
        try{
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
            dispatch({
                type:SET_DANH_SACH_PHIM,
                arrFilm:result.data.content,
            })
            
        }
        catch(err){
            console.log('err',err);
        }
    }
}


export const ThemPhimUploadHinh = (formdata) =>{
    return async(dispatch) =>{
        try {

            let result = await quanLyPhimService.ThemPhimUploadHinh(formdata);
            alert('Thêm phim thành công');
            // console.log(result.data.content);
            
            
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}

export const CapNhatPhimUploadAction = (formdata) =>{
    return async(dispatch) =>{
        try {

            let result = await quanLyPhimService.CapNhatPhimUpload(formdata);
            alert('Cập nhật phim thành công!');
            dispatch(layDanhSachPhimAction());

            history.push('/admin/films');


            
            
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}

export const xoaPhimAction = (maPhim) =>{
    return async(dispatch) =>{
        try {

            let result = await quanLyPhimService.xoaPhim(maPhim);
           
            //Xóa tc load lại danh sách
            dispatch(layDanhSachPhimAction());

          


            
            
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}

export const layThongTinPhimAction = (maPhim) =>{
    return async(dispatch) =>{
        try {
            let result = await quanLyPhimService.LayThongTinPhim(maPhim);
            // console.log('result',result.data.content);
            dispatch({
                type:SET_THONG_TIN_FILM,
                thongTinFilm: result.data.content
            })
        } catch (error) {
            console.log(error.response.data);
        }
    }
}