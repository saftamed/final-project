import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Delete, VerifiedUser } from "@material-ui/icons";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { cmntVerif,cmntDelete } from "../store/userApi";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Comments() {
  const verify = (id) => {
    cmntVerif(dispatch, id);
    var m = [...comments];
    m.find((x) => x._id === id).verified = true;
    setComments(m);
  };
  const deleteCmnt = (id) => {
    cmntDelete(dispatch, id);
    var m = [...comments];
    m =m.filter((x) => x._id !== id);
    setComments(m);
  };
  const columns = [
    {
      field: "productId",
      headerName: "Product Name",
      width: 170,
      renderCell: (params) => {
        return (
          <Link to={"/product/" + params.row.productId._id}>
            <span>{params.row.productId.title}</span>
          </Link>
        );
      },
    },
    {
      field: "userId",
      headerName: "User Email",
      width: 200,
      renderCell: (params) => {
        return (
          <Link to={"/user/" + params.row.userId._id}>
            <span>{params.row.userId.email}</span>
          </Link>
        );
      },
    },

    {
      field: "comment",
      headerName: "Comment",
      width: 150,
      renderCell: (params) => {
        return <span className="cmntSpan" onClick={()=> handleOpen(params.row.comment)} >{params.row.comment}</span>;
      }
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 150,
      renderCell: (params) => {
        return <Rating value={params.row.rating} readOnly />;
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 170,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,

      renderCell: (params) => {
        return (
          <>
            {params.row.verified === false && (
              <button className="e-d w" onClick={(e) => verify(params.row._id)}>
                Verified <VerifiedUser />{" "}
              </button>
            )}

            <button className="e-d d"  onClick={(e) => deleteCmnt(params.row._id)}>
              Delete
              <Delete />
            </button>
          </>
        );
      },
    },
  ];
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`https://store-ltt.herokuapp.com/api/v1/comments`).then((response) => {
      console.log(response.data);
      setComments(response.data);
    });
  }, []);
  const [rowHeight, setRowHeight] = useState(40);

  useEffect(() => {
    if (rowHeight === 40) {
      setRowHeight(42);
    } else {
      setRowHeight(40);
    }
  }, [comments]);
  const [open, setOpen] = useState(false);
  const [cmnt, setCmnt] = useState("");

    const handleOpen = (cm) => {
        setOpen(true);
        setCmnt(cm);
    };
  return (
    <div style={{ height: 520, width: "100%" }} className="product cmt">
      <Modal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comment
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {cmnt}
          </Typography>
        </Box>
      </Modal>
      <h1>Comments</h1>
      <DataGrid
        rows={comments}
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

export default Comments;
