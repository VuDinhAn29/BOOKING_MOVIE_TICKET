import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { GROUPID } from '../../../../util/settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { CapNhatPhimUploadAction, ThemPhimUploadHinh, layThongTinPhimAction } from '../../../../redux/actions/QuanLyPhimAction';






const Edit = (props) => {
    // console.log('1',props);
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();
    const {thongTinFilm} = useSelector(state=>state.QuanLyPhimReducer);

    useEffect(()=>{
        const {id} = props.match.params;
        dispatch(layThongTinPhimAction(id))
    },[])

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinFilm?.maPhim,
            tenPhim: thongTinFilm?.tenPhim,
            trailer: thongTinFilm?.trailer,
            moTa: thongTinFilm?.moTa,
            maNhom: GROUPID,
            ngayKhoiChieu: thongTinFilm?.ngayKhoiChieu,
            sapChieu: thongTinFilm?.sapChieu,
            dangChieu: thongTinFilm?.dangChieu,
            hot: thongTinFilm?.hot,
            danhGia: thongTinFilm?.danhGia,
            hinhfAnh: null,

       
        },
        onSubmit: (values) => {
            console.log({ values });
            values.maNhom = GROUPID;
            //Tạo đối tượng formData -> đưa giá trị values từ formik vào formdata
            let formData = new FormData();
            for(let key in values) {
                if(key!=='hinhAnh'){
                    formData.append(key,values[key]);
                }else{
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
            
                      }
                  
                }
            }
            //Gọi api gửi các giá trị formdata về backend xử lý
            dispatch(CapNhatPhimUploadAction(formData))
            // console.log('formData',formData.get('File'));
            
        }
    })

    console.log('123',formik);

    const handleChangeDataPicker = (value) => {
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }

    const handleChangSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }
    const handleChangeFile = async(e) => {
        //lấy file từ e
        const file = e.target.files[0];

        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {        
            // Đem dữ liệu file lưu vào formik
            await formik.setFieldValue('hinhAnh', file)

            //Tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // console.log(e.target.result);
                setImgSrc(e.target.result); //Hình base 64
            }



        }


    }

    return (
        <>
            <h3>Edit Film</h3>

            <Form
    
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Tên Phim">
                    <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
                </Form.Item>

                <Form.Item label="Trailer">
                    <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
                </Form.Item>

                <Form.Item label="Mô tả">
                    <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
                </Form.Item>

                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDataPicker} value={moment(formik.values.ngayKhoiChieu)} />
                </Form.Item>

                <Form.Item label="Đang chiếu" valuePropName="checked" >
                    <Switch onChange={handleChangSwitch('dangChieu')} checked={formik.values.dangChieu} />
                </Form.Item>

                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch onChange={handleChangSwitch('sapChieu')} checked={formik.values.sapChieu} />
                </Form.Item>

                <Form.Item label="Hot" valuePropName="checked">
                    <Switch onChange={handleChangSwitch('hot')} checked={formik.values.hot} />
                </Form.Item>

                <Form.Item label="Số sao">
                    <InputNumber onChange={handleChangeInputNumber('danhGia')} value={formik.values.danhGia} min={1} max={10} />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
                    <br />
                    <img style={{ width: 150, height: 150 }} src={imgSrc} alt='...' />

                </Form.Item>

                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-blue-500 text-white p-2">Cập nhật phim</button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Edit;