import React, { useEffect, useState } from 'react'
import { DataGrid,GridToolbar } from '@material-ui/data-grid';
import { Link, NavLink } from 'react-router-dom';
import {Delete,Edit} from '@material-ui/icons';
import { deleteUser, getUsers} from '../store/userApi';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



function Sales() {
    const user = useSelector(state => state.currentUser)
    const [orders,setOrders] = useState([]);
    const dispatch = useDispatch()
    const [rowHeight, setRowHeight] = useState(40);

    useEffect(() => {
      if (rowHeight === 40) {
        setRowHeight(42);
      } else {
        setRowHeight(40);
      }
    }, [orders]);
  const columns = [
      {
        field: "_id",
        headerName: "Id",
        width: 170,
      },
      {
        field: "userId",
        headerName: "User Email",
        width: 170,
        renderCell: (params) => {
            return (
                <NavLink to={"/user/" + params.row.userId._id}>
                <span> {params.row.userId.email}</span>
                </NavLink>
            );
        }
      },
      {
          field: "createdAt",
          headerName: "CreatedAt",
          width: 200,
      },
      
      {
          field: "amount",
          headerName: "Amount",
          width: 150,
  
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,
      },
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <>
              <Link to={"/order/" + params.row._id}>
                <button className="e-d d" >Edit <Edit />  </button>
              </Link>
            </>
          );
        },
      },
    ];

    useEffect(() => {
        axios.defaults.headers.common["token"] = `Bearer ${user.accessToken}`;

        axios.get("https://store-ltt.herokuapp.com/api/v1/order/last").then((res) => {
          setOrders(res.data);
        }
        , (err) => {
          console.log(err);
        }
        );
    }, [])
    
  return (
    <div style={{ height: 550, width: '100%' }} className='product'>
        <h1>Last Sales</h1>
    <DataGrid
      rows={orders}
      columns={columns}
      pageSize={8}
      rowHeight={rowHeight}
      rowsPerPageOptions={[5,10,20]}
      getRowId={(row) => row._id}
      checkboxSelection
      disableSelectionOnClick
      components={{
        Toolbar: GridToolbar,
      }}
    />
  </div>
  )
}


export default Sales