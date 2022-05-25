import React, { useEffect, useState } from "react";
import { DataGrid,GridToolbar } from "@material-ui/data-grid";
import { Delete, Edit } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import axios from "axios";
const columns = [
  {
    field: "_id",
    headerName: "ID",
    width: 220,
  },

  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: true,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
  },
];
function NewsSub() {
  const dispatch = useDispatch();
  const [subs, setSubs] = useState([]);
  useEffect(() => {
    axios.get(`https://store-ltt.herokuapp.com/api/v1/news`).then((response) => {
      setSubs(response.data);
    });
  }, []);
  const [rowHeight, setRowHeight] = useState(40);    

  useEffect(() => {
           if (rowHeight === 40) {
             setRowHeight(42);
           }else {
            setRowHeight(40);
           }
        }, [subs]);
  return (
    <div style={{ height: 550, width: "100%" }} className="product">
      <h1>Subscribers To The News Letter</h1>
      <DataGrid
        rows={subs}
        columns={columns}
        rowHeight={rowHeight}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        getRowId={(row) => row._id}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}

export default NewsSub;
