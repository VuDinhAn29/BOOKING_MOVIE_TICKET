import { Button, Input, Table } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { AudioOutlined, EditOutlined, SearchOutlined, DeleteOutlined,CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

import { history } from '../../../App';

const { Search } = Input;


export default function Films(props) {
    const {arrFilmDefault} = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    console.log('data23',arrFilmDefault);
    useEffect(()=>{
       dispatch(layDanhSachPhimAction())
    },[])
    const columns = [
        {
          title: 'Mã phim',
          dataIndex: 'maPhim',
          width:'15%',
          sorter: (a, b) => a.maPhim - b.maPhim,
          sortDirections: ['descend', 'ascend'],
        
        },
        {
          title: 'Hình ảnh',
          dataIndex: 'hinhAnh',
          width:'15%',
          render:(text, film, index)=>{
            return <Fragment>
                <img src={film?.hinhAnh} alt={film?.tenPhim} width={50} height={50} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} /> 
            </Fragment>
          }      
        //   sorter: (a, b) => a.age - b.age,
        //   sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
        //   ellipsis: true,
        },
        {
          title: 'Tên phim',
          dataIndex: 'tenPhim',
          sorter: (a, b) => {
            let tenPhimA = a.tenPhim?.toLowerCase().trim();
            let tenPhimB = b.tenPhim?.toLowerCase().trim();
            if (tenPhimA > tenPhimB) {
                return 1;
            }
            return -1;
          },
          sortDirections: ['descend', 'ascend'],
          width: '25%'
       
        //   filteredValue: filteredInfo.address || null,
        //   onFilter: (value, record) => record.address.includes(value),
        //   sorter: (a, b) => a.address.length - b.address.length,
        //   sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
        //   ellipsis: true,
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            width: '25%',
            render:(text, film, index)=>{
                 return <Fragment>
                     {film?.moTa.length > 50 ? film.moTa.substr(0,50) + ' ...': film.moTa  }
                 </Fragment>
            }

          },
          {
            title: 'Hành động',
            width: '25%',
            render:(text, film)=>{
                 return <Fragment>
                   <NavLink key={1} className=" mr-2  text-2xl" to={`/admin/films/edit/${film?.maPhim}`}><EditOutlined style={{ color: 'blue' }} /> </NavLink>
                   <span style={{ cursor: 'pointer' }} key={2} className="text-2xl" ><DeleteOutlined style={{ color: 'red' }} onClick={()=>{
                      if(window.confirm('Bạn có chắc muốn xóa phim ' + film.tenPhim)){
                        dispatch(xoaPhimAction(film.maPhim))
                      }
                   }} /> </span>
                   <NavLink key={1} className=" mr-2  text-2xl" to={`/admin/films/showtime/${film?.maPhim}/${film?.tenPhim}`} onClick={()=>{
                       localStorage.setItem('filmParams',JSON.stringify(film));
                   }}
                     ><CalendarOutlined style={{ color: 'green' }} /> </NavLink>
                 </Fragment>
            }

          },
      ];
      const data = arrFilmDefault;
    
    // const [filteredInfo, setFilteredInfo] = useState({});
    // const [sortedInfo, setSortedInfo] = useState({});
    // const handleChange = (pagination, filters, sorter) => {
    //     console.log('Various parameters', pagination, filters, sorter);
    //     setFilteredInfo(filters);
    //     setSortedInfo(sorter);
    //   };
    const onSearch = (value) => {
      console.log('1251251',value);
      dispatch(layDanhSachPhimAction(value));
      
    }
  return (
    <div>
        
         <h3 className='text-4xl'>Quản lý Phim</h3>
         <Button className='mb-5 ' onClick={()=>{
              history.push('/admin/films/addnew')
         }} >Thêm Phim</Button>
         <Search
              
                placeholder="input search text"
                enterButton={<SearchOutlined />}
                size="large"
                
                onSearch={onSearch}
            />

        <Table
        className='mt-5'
        columns={columns}
        rowKey={"maPhim"}
        dataSource={data}
        // pagination={tableParams.pagination}
        
      />
    </div>
  )
}
