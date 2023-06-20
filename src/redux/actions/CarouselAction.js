import axios from "axios"
import { SET_CAROUSEL } from "./types/CarouselType";
import { DOMAIN } from "../../util/settings/config";
import { quanLyPhimService } from "../../services/QuanLyPhimService";

export const getCarouselAction = () =>{
    return async (dispatch) =>{
        try{
            const result = await quanLyPhimService.layDanhSachBanner();
            dispatch({
                type:SET_CAROUSEL,
                arrImg:result.data.content,
            })
            // console.log('data',result.data);
        }
        catch(err){
            console.log('err',err);
        }
    }
}