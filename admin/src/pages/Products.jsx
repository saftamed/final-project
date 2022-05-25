import React, { useEffect, useState } from 'react'
import { DataGrid ,GridToolbar} from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import {Delete,Edit} from '@material-ui/icons';
import { getProducts, proDelete } from '../store/userApi';
import { useDispatch, useSelector } from 'react-redux';



function Products() {
  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 170,
    },
    {
      field: "desc",
      headerName: "Description",
      width: 200,
    },
    { field: "createdAt", headerName: "created At", width: 200 },
      
      {
          field: "img",
          headerName: "Image",
          width: 130,
          renderCell: (data) => {
              return <img src={"https://store-ltt.herokuapp.com/public/"+data.row.img} alt="img" style={{ width: '100px', height: '100px' }} />
          }
  
      },
      {
        field: "price",
        headerName: "Price",
        width: 150,
      },
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <>
              <Link to={"/product/" + params.row._id}>
                <button className="e-d w" >Edit <Edit />  </button>
              </Link>
              
              <button className='e-d d' onClick={()=>deletePro(params.row._id)}>
              Delete
              <Delete />
              </button>
            </>
          );
        },
      },
    ];
  const deletePro = (id) => {
    proDelete(dispatch, id);
  }
    const products = useSelector((state) => state.products);
    const dispatch = useDispatch()
    useEffect(() => {
        getProducts(dispatch)
    }, [])
    
  return (
    <div style={{ height: 550, width: '100%' }} className='product'>
        <h1>Products</h1>
    <DataGrid
      rows={products}
      columns={columns}
      pageSize={8}
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

export default Products