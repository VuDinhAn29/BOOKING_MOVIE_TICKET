
import { applyMiddleware,combineReducers,legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducers";
import { QuanLyPhimReducer } from "./reducers/QuanLyPhimReducer";
import { QuanLyRapReducer } from "./reducers/QuanLyRapReducer";
import { QuanLyNguoiDungReducers } from "./reducers/QuanLyNguoiDungReducers";
import { QuanLyDatVeReducers } from "./reducers/QuanLyDatVeReducers";
import { LoadingReducer } from "./reducers/LoadingReducers";

const rootReducer = combineReducers({
    //state ứng dụng
    CarouselReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyNguoiDungReducers,
    QuanLyDatVeReducers,
    LoadingReducer,
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));

