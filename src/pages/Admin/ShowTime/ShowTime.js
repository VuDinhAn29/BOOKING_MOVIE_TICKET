import { Button, Form, InputNumber, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Cascader } from 'antd';
import { DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
import { history } from '../../../App';

export default function ShowTime(props) {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: ''
        },
        onSubmit: async (values)=>{
            console.log('abvc',values);
           try {
              const result = await quanLyDatVeService.taoLichChieu(values);

              alert(result.data.content);

              history.push('/admin/films')
              window.location.reload();

           } catch (error) {
             console.log('error', error.response?.data)
           }
        }
    })

    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: [],
    })




    useEffect( () => {
        async function fetchData() {
        try {
            let result = await quanLyRapService.layThongTinHeThongRap();
            setState({
                ...state,
                heThongRapChieu: result.data.content
            })

        } catch (error) {
            console.log('err', error);
        }
    }  
       fetchData();


    }, [])

    const handleChangeHeThongRap = async (value) => {
            try {
                let result = await quanLyRapService.layThongTinCumRap(value);
                setState({
                    ...state,
                    cumRapChieu: result.data.content
                })

            } catch (error) {
                console.log('error', error.response?.data);
            }
        }
       
    const convertSelectHTR = (value) => {
        return state.heThongRapChieu.map((htr, index) => {
            return { label: htr.tenHeThongRap, value: htr.maHeThongRap }
        })
    }

    const handleChangeCumRap = (value) => {
        formik.setFieldValue('maRap', value)
    }


    const onChangeDate = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
    }
    const onOk = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
    }
    const onChangeInputNumber = (value) => {
        formik.setFieldValue('giaVe',value)
    }

    let film = {};
    if (localStorage.getItem('filmParams')) {
        film = JSON.parse(localStorage.getItem('filmParams'));
    }

    console.log('film',film);

    return (
        <div className='container-fluid'>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onSubmitCapture={formik.handleSubmit}

            >   

                <h3 className="text-2xl">Tạo lịch chiếu - {props.match.params.tenPhim}</h3>
                <img src={film.hinhAnh} alt='...' width={200} height={100} />
                <Form.Item label="Hệ thống rạp" >
                    <Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
                </Form.Item>

                <Form.Item label="Cụm rạp">
                     <Select options={state.cumRapChieu?.map((cumRap,index)=>({ label: cumRap.tenCumRap, value: cumRap.maCumRap }))} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
                </Form.Item>

                <Form.Item label="Ngày chiếu giờ chiếu">
                    <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />
                </Form.Item>

                <Form.Item label="GIá vé">
                    <InputNumber onChange={onChangeInputNumber} min={75000} max={150000} />
                </Form.Item>

                <Form.Item label="Chức năng">
                    <Button htmlType="submit">Tạo lịch chiếu</Button>
                </Form.Item>

            </Form>
        </div>
    )
}
