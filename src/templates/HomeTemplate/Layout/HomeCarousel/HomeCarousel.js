import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCarouselAction } from '../../../../redux/actions/CarouselAction';



const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize  : 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'black',
    
};

export default function HomeCarousel() {
    const {arrImg} = useSelector(state=>state.CarouselReducer);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCarouselAction())
    },[])
    const renderImg = () =>{
        return arrImg.map((item,index)=>{
            return <div key={index}>
                <div style={{...contentStyle,backgroundImage:`url(${item.hinhAnh})`}}>
                     <img src='item.hinhanh' className='w-full opacity-0' alt='123' />
                </div>
            </div>
        })
    }
    return (
        <Carousel effect="fade">
           {renderImg()}
        </Carousel>
    )
}
