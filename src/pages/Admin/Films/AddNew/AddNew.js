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
import React, { useState } from 'react';
import { GROUPID } from '../../../../util/settings/config';
import { useDispatch } from 'react-redux';
import { ThemPhimUploadHinh } from '../../../../redux/actions/QuanLyPhimAction';






const AddNew = () => {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const formik = useFormik({
        initialValues: {
            maPhim: '',
            tenPhim: '',
            trailer: '',
            moTa: '',
           
            ngayKhoiChieu: '',
            sapChieu: false,
            dangChieu: false,
            hot: false,
            danhGia: 5,
            hinhfAnh: '',

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
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                }
            }
            //Gọi api gửi các giá trị formdata về backend xử lý
            dispatch(ThemPhimUploadHinh(formData))
            // console.log('formData',formData.get('File'));
            
        }
    })

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
    const handleChangeFile = (e) => {
        //lấy file từ e
        const file = e.target.files[0];

        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {

            //Tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // console.log(e.target.result);
                setImgSrc(e.target.result);
            }

            // Đem dữ liệu file lưu vào formik
            formik.setFieldValue('hinhAnh', file)


        }


    }

    return (
        <>
            <h3>Thêm mới phim</h3>

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
                    <Input name="tenPhim" onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item label="Trailer">
                    <Input name='trailer' onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item label="Mô tả">
                    <Input name='moTa' onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDataPicker} />
                </Form.Item>

                <Form.Item label="Đang chiếu" valuePropName="checked" >
                    <Switch onChange={handleChangSwitch('dangChieu')} />
                </Form.Item>

                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch onChange={handleChangSwitch('sapChieu')} />
                </Form.Item>

                <Form.Item label="Hot" valuePropName="checked">
                    <Switch onChange={handleChangSwitch('hot')} />
                </Form.Item>

                <Form.Item label="Số sao">
                    <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
                    <br />
                    <img style={{ width: 150, height: 150 }} src={imgSrc} alt='...' />

                </Form.Item>

                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-blue-500 text-white p-2">Thêm phim</button>
                </Form.Item>
            </Form>
        </>
    );
};
export default AddNew;