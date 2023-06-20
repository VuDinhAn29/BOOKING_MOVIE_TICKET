import React, { useEffect } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
// import '../../assets/style/circle.scss'
import './Detail.css'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CHI_TIET_PHIM } from '../../redux/actions/types/QuanLyRapType'
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction'
import moment from 'moment/moment'
import { Rate, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import { NavLink } from 'react-router-dom'

export default function Detail(props) {
  const { filmDetail } = useSelector(state => state.QuanLyPhimReducer);
  const dispatch = useDispatch();

  // console.log('1', filmDetail);

  useEffect(() => {
    // lấy thông tin param từ url
    let { id } = props.match.params;
    dispatch(
      layThongTinChiTietPhim(id)
    )

  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);

  })


  return (
    <div style={{ backgroundImage: 'url(http://picsum.photos/1000)', backgroundSize: '100%', backgroundPosition: 'center', minHeight: '100vh' }}>
      <CustomCard
        style={{ minHeight: '100vh', paddingTop: 150 }}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className='grid grid-cols-12'>
          <div className='col-span-5 col-start-3'>
            <div className='grid grid-cols-3'>
              <img className='col-span-1' src={filmDetail.hinhAnh} style={{ width: '100%', height: 300 }} alt='123' />
              <div className='col-span-2 text-black ml-5' style={{ marginTop: '25%' }}>
                <p className='text-sm'>Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                <p className="text-4xl leading-10">{filmDetail.tenPhim}</p>
                <p>{filmDetail.moTa}</p>
              </div>
            </div>

          </div>
          <div className='col-span-4'>
            <h1 style={{ marginLeft: '15%', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</h1>
            <h1 style={{ marginLeft: '5%' }} className="text-green-400 text-2xl"><Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} /></h1>
            <div className={`c100 p${filmDetail.danhGia * 10} big`}>
              <span className="text-white">

                {filmDetail.danhGia * 10}%
              </span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>

              </div>
            </div>
            <br />

          </div>
        </div>

        <div className='mt-10 ml-72 w-2/3 container bg-white px-5 py-5'>

          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Lịch chiếu" style={{ minHeight: 300 }} key="1">
              <div>
                <Tabs tabPosition={'left'}>
                  {filmDetail.heThongRapChieu?.map((htr, index) => {
                    return <TabPane
                      tab={<div>
                        <img src={htr.logo} className='rounded-full w-full' style={{ width: 50 }} />
                        {htr.tenHeThongRap}
                      </div>}
                      key={index}>
                      {htr.cumRapChieu?.map((cumRap, index) => {
                        return <div className="mt-5" key={index}>
                          <div className="flex flex-row">
                            <img style={{ width: 60, height: 60 }} src={cumRap.hinhAnh} alt="..." />
                            <div className="ml-2">
                              <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }} >{cumRap.tenCumRap}</p>
                              <p className="text-gray-400" style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                            </div>
                          </div>
                          <div className="thong-tin-lich-chieu grid grid-cols-4">
                            {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                              return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="col-span-1 text-green-800 font-bold">
                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                              </NavLink>
                            })}
                          </div>
                        </div>
                      })}
                    </TabPane>
                  })}
                </Tabs>
              </div>
            </TabPane>
            <Tabs.TabPane tab="Thông tin" key="2">
                 <p>{filmDetail.moTa}</p>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đánh giá" key="3">
                Đánh giá: {filmDetail.danhGia}
            </Tabs.TabPane>
          </Tabs>
        </div>


      </CustomCard>

    </div>
  )
}
