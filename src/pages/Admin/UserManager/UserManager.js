
import { Input, Table } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  layDanhSachNguoiDungAction, timKiemNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';

const { Search } = Input;


export default function UserManager(props) {
      const {listUser} = useSelector(state=>state.QuanLyNguoiDungReducers);
      const dispatch = useDispatch();
    //   console.log('props11',props);
    //   console.log('123',listUser);
      useEffect(()=>{
        dispatch(layDanhSachNguoiDungAction());
      },[])

      const onSearch = (value) => {
          dispatch(timKiemNguoiDungAction(value))
      };
      
      const columns = [
        {
          title: 'Tài khoản',
          dataIndex: 'taiKhoan',
          sorter: (a, b) => {
            let taiKhoanA = a.taiKhoan.toLowerCase().trim();
            let taiKhoanB = b.taiKhoan.toLowerCase().trim();
            if (taiKhoanA > taiKhoanB) {
              return 1;
            }
            return -1;
          },
          sortDirections: ['descend', 'ascend'],
    
        },        
        
        {
          title: 'Họ tên',
          dataIndex: 'hoTen',
          sorter: (a, b) => {
            let hoTena = a.hoTen?.toLowerCase().trim();
            let hoTenb = b.hoTen?.toLowerCase().trim();
            if (hoTena > hoTenb) {
              return 1;
            }
            return -1;
          },
          sortDirections: ['descend', 'ascend'],
    
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
            title: 'Số ĐT',
            dataIndex: 'soDt',
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',
        },
        {
            title: 'Mã người dùng',
            dataIndex: 'maLoaiNguoiDung',
        },
        {
            title: 'Action',
            render:(text,user)=>{
                return <Fragment>
                   <NavLink key={1} className=" mr-2  text-2xl" to={`/admin/usermanager/edituser/${user.taiKhoan}`}><EditOutlined style={{ color: 'blue' }} /> </NavLink>
                   <span style={{ cursor: 'pointer' }} key={2} className="text-2xl" onClick={()=>{
                    if(window.confirm("Bạn có muốn chắc xóa người dùng " + user.taiKhoan ))
                       dispatch(xoaNguoiDungAction(user.taiKhoan))
                   }}><DeleteOutlined style={{ color: 'red' }} /></span>
                </Fragment>
            }
        },
      ];

      

    return (
        <div className='text-xl'>
            <button className='bg-blue-500 p-5  hover:bg-blue-700 text-white font-bold  border border-blue-700 rounded' onClick={()=>{
                history.push('usermanager/adduser')
            }}   >
                Thêm Người Dùng +
            </button>
             <br/>
            <Search
                placeholder="nhập vào tài khoản hoặc họ tên người dùng"
                allowClear
                onSearch={onSearch}
                size={'large'}
                style={{
                    width: 800,
                    fontSize: 25,

                }}
                className="mb-8 mt-8"
              
            />
             
            <Table columns={columns}   rowKey={"taiKhoan"}   dataSource={listUser} />

        </div>

    )
}
