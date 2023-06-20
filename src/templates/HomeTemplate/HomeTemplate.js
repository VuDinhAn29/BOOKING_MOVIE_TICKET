import React, { Fragment, useEffect } from 'react'
import { Route } from 'react-router-dom';
import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer';
import HomeCarousel from './Layout/HomeCarousel/HomeCarousel';


export const HomeTemplate = (props) => {
    const {Component,...restProps} = props;

    useEffect(() => {
        window.scrollTo(0, 0);

    })

    return <Route {...restProps} render={(propsRoute)=>{

        return <Fragment>
            <Header  {...propsRoute} />
            <Component {...propsRoute}/>

            <hr className="mt-5"/>
            <Footer />

          
        </Fragment>
    }} />

   
  
}
