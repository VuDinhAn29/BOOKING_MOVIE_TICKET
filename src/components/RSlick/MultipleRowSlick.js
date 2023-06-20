import React, { Component } from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css';

import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import { useDispatch, useSelector } from "react-redux";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "../../redux/actions/types/QuanLyPhimType";



function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}


const MultipleRowSlick = (props) => {
    
   const dispatch = useDispatch();
   const {dangChieu,sapChieu} = useSelector(state=>state.QuanLyPhimReducer)
    
    const renderFilm = () => {
    return props.arrFilm.slice(0,12).map((item, index) => {
        return <div className="mt-2" key={index}>
              <Film_Flip item={item} />
        </div> 
    })
    }
    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 2,
        speed: 500,
        rows: 2,
        slidesPerRow: 2,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    }
    let activeClassDC= dangChieu === true ? 'active_Film' : 'none_active_Film';
    let activeClassSC= sapChieu === true ? 'active_Film' : 'none_active_Film';
    return (
      <div>
        <button className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded text-white dark:bg-gray-800 mr-2`} onClick={()=>{
           const action = {type:SET_FILM_DANG_CHIEU}
           dispatch(action);
        }}>PHIM ĐANG CHIẾU</button>
        <button className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded text-gray-800 border bg-white mr-2`} onClick={()=>{
           const action = {type:SET_FILM_SAP_CHIEU}
           dispatch(action);
        }}>PHIM Sắp CHIẾU</button>
        <Slider {...settings}>
             {renderFilm()}   
        </Slider>
      </div>
    );
  }


export default MultipleRowSlick;