import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
import { useSelector,useDispatch } from 'react-redux'
import Film from '../../components/Film/Film'
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick'
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction'
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'

export default function Home(props) {
  const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
  const {heThongRapChieu} = useSelector(state=>state.QuanLyRapReducer)
  const dispatch = useDispatch();

  // const renderFilm = () => {
  //   return arrFilm.map((phim, index) => {
  //     return <Film key={index} />
  //   })
  // }

  useEffect(()=>{
    const action = layDanhSachPhimAction();
    dispatch(action);
    dispatch(layDanhSachHeThongRapAction());
  },[])


  return (
    <div>
          <HomeCarousel />

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {/* <div className="flex flex-wrap -m-4">
                {renderFilm()}
          </div> */}
          <MultipleRowSlick arrFilm={arrFilm} />
          
        </div>
      </section>

      <div className='mx-40'>
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  )
}
