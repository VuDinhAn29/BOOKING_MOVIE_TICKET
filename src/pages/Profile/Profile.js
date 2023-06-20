import React, { useEffect } from 'react'
import backgroudImg from '../../assets/style/img/backgroundImg.46008816be6854d2e78e.jpg'
import { Tabs } from 'antd';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatNguoiDungAction, capNhatNguoiDungProfileAction, layDanhSachLoaiNguoiDungAction, layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID, USER_LOGIN } from '../../util/settings/config';
import { history } from '../../App';
import moment from 'moment';
import _ from 'lodash';


export default function Profile() {

  const onChange = (key) => {
    // console.log(key);
  };

  const dispatch = useDispatch();

  const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducers);
  // const { loaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducers);
  // console.log('123',thongTinNguoiDung);

  

  useEffect(() => {
    if (!localStorage.getItem(USER_LOGIN)) {
      history.push("/login")
    }
    // dispatch(layDanhSachLoaiNguoiDungAction());
    dispatch(layThongTinNguoiDungAction());
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinNguoiDung.taiKhoan,
      matKhau: thongTinNguoiDung.matKhau,
      email: thongTinNguoiDung.email,
      soDt: thongTinNguoiDung.soDT,
      maNhom: GROUPID,
      maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung === "Quản trị" ? "QuanTri" : "KhachHang",
      hoTen: thongTinNguoiDung.hoTen
    },
    onSubmit: (values) => {
      if (window.confirm('Bạn có chắc muốn cập nhật tài khoản ' + values.taiKhoan)) {
        dispatch(capNhatNguoiDungProfileAction(values))
      }

    },
    validationSchema: yup.object({
      taiKhoan: yup.string()
        .min(6, "Mininum 6 characters")
        .max(32, "Maximum 32 characters")
        .required("Required!"),
      matKhau: yup.string()
        .min(6, "Mininum 6 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      email: yup.string()
        .email("Invalid email format")
        .required("Required!"),
      soDt: yup.string()
        .min(6, "Mininum 6 characters")
        .max(12, "Maximum 12 characters")
        .required("Required!"),
      maNhom: yup.string()
        .min(4, "Mininum 4 characters")
        .max(4, "Maximum 4 characters")
        .required("Required!"),
      hoTen: yup.string()
        .min(6, "Mininum 6 characters")
        .max(32, "Maximum 32 characters")
        .required("Required!"),
      // maLoaiNguoiDung: yup.string()
      //   .required("Required!"),
    })
  });

  const renderUser = () => {
    return (
      <form onSubmit={formik.handleSubmit} className=' ' >
        <div className="mt-10 mb-10 px-12 sm:px-24 md:px-48 lg:px-12  xl:px-24 ">
          <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
             xl:text-bold">Thông Tin Người Dùng</h2>
          <div className="mt-10">
            <div className='grid grid-cols-2 gap-x-10'>
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Tài Khoản
                  </div>
                </div>
                <input disabled name="taiKhoan" style={{ paddingLeft: '10px' }} onChange={formik.handleChange} value={formik.values.taiKhoan} className="w-full mt-2  text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào tài khoản" />

                {formik.errors.taiKhoan && formik.touched.taiKhoan ?

                  <p className='text-red-500'>{formik.errors.taiKhoan}</p> : ''
                }
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Mật khẩu
                  </div>
                </div>
                <input name="matKhau" type='password' style={{ paddingLeft: '10px' }} onChange={formik.handleChange} value={formik.values.matKhau} className="w-full mt-2 text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào mật khẩu" />
                {formik.errors.matKhau && formik.touched.matKhau ?
                  <p className='text-red-500'>{formik.errors.matKhau}</p> : ''
                }
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Email
                  </div>
                </div>
                <input type="email" name="email" style={{ paddingLeft: '10px' }} onChange={formik.handleChange} value={formik.values.email} className="w-full  mt-2 text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào Email" />
                {formik.errors.email && formik.touched.email ?
                  <p className='text-red-500'>{formik.errors.email}</p> : ''
                }
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Số Điện Thoại
                  </div>
                </div>
                <input name="soDt" style={{ paddingLeft: '10px' }} value={formik.values.soDt} onChange={formik.handleChange} className="w-full text-lg py-2 b mt-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào Số Điện Thoại" />
                {formik.errors.soDt && formik.touched.soDt ?
                  <p className='text-red-500'>{formik.errors.soDt}</p> : ''
                }
              </div>

              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Họ Tên
                  </div>
                </div>
                <input name="hoTen" style={{ paddingLeft: '10px' }} value={formik.values.hoTen} onChange={formik.handleChange} className="w-full text-lg py-2  mt-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào Họ Tên" />
                {formik.errors.hoTen && formik.touched.hoTen ?
                  <p className='text-red-500'>{formik.errors.hoTen}</p> : ''
                }
              </div>

              {/* <div className="mt-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Loại Người Dùng
                  </div>
                </div>
                <select name="maLoaiNguoiDung" value={formik.values.maLoaiNguoiDung} style={{ paddingLeft: '10px' }} onChange={formik.handleChange} className="w-full te mt-2 xt-lg py-3 border-b border-gray-300 focus:outline-none focus:border-indigo-500 font-bold text-gray-500" placeholder="Nhập vào Họ Tên">
                  <option value={''}>
                    Chọn loại người dùng
                  </option>
                  {loaiNguoiDung.map((loaiNguoiDung, index) => {
                    return <option key={index} value={loaiNguoiDung.maLoaiNguoiDung}>
                      {loaiNguoiDung.tenLoai}
                    </option>
                  })}
                </select>
                {formik.errors.maLoaiNguoiDung && formik.touched.maLoaiNguoiDung ?
                  <p className='text-red-500'>{formik.errors.maLoaiNguoiDung}</p> : ''
                }
              </div> */}

            </div>
            <div className="mt-10">
              <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
               font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
               shadow-lg">
                Cập Nhật
              </button>
            </div>

          </div>
        </div>
      </form>
    )
  }

  const renderLishSuDatVe = () => {
     return <div className="flex flex-wrap -m-2">
          { thongTinNguoiDung.thongTinDatVe?.map((ticket,index)=>{
              const seats = _.first(ticket.danhSachGhe);
              return  <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                    <div className="flex-grow">
                      <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                      <p className="text-gray-500">Giờ chiếu: {moment(ticket.ngayDat).format('hh:mm A')} -Ngày chiều {moment(ticket.ngayDat).format('DD-MM-YYYY')} </p>
                      <p>Địa điểm: {seats.tenHeThongRap}</p>
                      <p><span className="font-bold">Địa điểm:</span> {seats.tenHeThongRap}   </p>
                        <p>
                            <span className="font-bold">Tên rạp:</span>  {seats.tenCumRap} - <span className="font-bold">Ghế:</span>  {ticket.danhSachGhe.map((ghe, index) => { return <span className="text-green-500 text-xl" key={index}> [ {ghe.tenGhe} ] </span> })}
                        </p>
                    <span className="flex items-center space-x-2">
                                <span className="dark:text-black">Ngày Đặt: <span className='font-semibold'>{moment(ticket.ngayDat).format('DD/MM/YYYY hh:mm:ss A')}</span></span>
                    </span>
                      
                    </div>
                  </div>
            </div>
         }) 
        }
 
      </div>
  }


  return (
    <div className='min-h-screen w-full'>
      <div style={{ backgroundImage: `url(${backgroudImg})`, height: '450px', width: '100%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} >

      </div>
      <div className='px-20'>
        <Tabs
          type='card'
          defaultActiveKey="1"
          onChange={onChange}
          items={[
            {
              label: `Thông tin cá nhân`,
              key: '1',
              children: renderUser(),
            },
            {
              label: `Lịch sử đặt vé`,
              key: '2',
              children: renderLishSuDatVe(),
            },

          ]}
        />
      </div>
    </div>
  )
}
