import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";
import { MenuItem, Box } from "@mui/material";
import { AddCircleOutline, Send, DeleteForever } from "@material-ui/icons";
import {IconButton,Button} from "@mui/material";
import { updateProduct,addProduct } from "../store/userApi";
function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [setting, setSetting] = useState({ option: 1,color:0 });
  const [image, setImage] = useState({ preview: '', data: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData()
    formData.append('file', image.data)
    let p = product;
    if(setting.option === 1){
      p= { ...product, colors: product.colors.map((color, index) => {return {name:color.name} }) };
  
      }else if(setting.option === 2){
        delete p.colors;
      }
    formData.append('product', JSON.stringify(p))
    if(id==="add"){
     addProduct(dispatch, formData);
     } else{
      updateProduct(dispatch, { formData, id });
    }
    
  }

  const setTextHan = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const ChangeColorName= (e) => {
    let c = {...product};
    c.colors[setting.color].name = e.target.value;
    setProduct(c);

  };
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }
  const addNewColor = () => {
    let c = {...product};
    c.colors.push({name:"New Color",sizes:{xl:0,l:0,m:0,s:0,xxl:0}});
    
    setProduct(c);
    setSetting({...setting,color:c.colors.length-1});
  }

  const deleteColor = () => {
    setSetting({...setting,color:0});
    let c = {...product};
    c.colors.splice(setting.color,1);
    setProduct(c);
  }

  const changeOption = (e) => {
    if(e.target.value===0){
      if(!product.colors.length>0){
        let c = {...product};
        c.colors = [{name:"",sizes:[]}];
        setProduct(c);
      }
      else if(!product.colors[0]?.sizes?.length>0){
        let c = {...product};
        c.colors = c.colors.map((color)=>{
          return {...color,sizes:{xl:0,l:0,m:0,s:0,xxl:0}};
        })
        setProduct(c);
      }

    }
      
    console.log(product);
    setSetting({ ...setting, option: e.target.value });
  }
  const ChangeSize = (e) => {
    let c = {...product};
    c.colors[setting.color].sizes[e.target.name] = e.target.value;
    setProduct(c);

  };

  useEffect(() => {
    if(id ==="add"){
      setProduct({
        title: "New Product",
        price: 0,
        desc: "",
        colors: [{name:"New Color"}],
        categories: [],
        img:"product.jpg"
      });
      setImage({preview:`https://store-ltt.herokuapp.com/public/product.jpg`,data:""});
    }else{
      axios
      .get(`https://store-ltt.herokuapp.com/api/v1/product/find/${id}`)
      .then((response) => {
        console.log(response.data);
        
        if (response.data.colors.length > 0) {
          if(response.data.colors[0].sizes !== undefined){
            setSetting({ option: 0 ,color:0});
            console.log("0");
          }else{
            setSetting({ option: 1 ,color:0});
            console.log("1");
          }
          
        }else{
          setSetting({ option: 2 ,color:0});
          console.log("2");
        }
        setProduct(response.data);
        setImage({preview:`https://store-ltt.herokuapp.com/public/${response.data.img}`,data:""});
      });
    }

  }, [id]);

  return (
    product && (
      <>
        <h1>{product.title}</h1>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          autoComplete="off"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="product-info">
            <div>
              <img src={image.preview} />
              <div className="file-input">
                <input
                  type="file"
                  name="file"
                  id="file-input"
                  className="file-input__input"
                  onChange={handleFileChange}
                />

                <label className="file-input__label" htmlFor="file-input">
                  <span>Upload file</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="upload"
                    className="svg-inline--fa fa-upload fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                    ></path>
                  </svg>
                </label>
              </div>
            </div>
            <div className="left">
              <TextField
                required
                fullWidth
                label="Title"
                variant="outlined"
                defaultValue={product.title}
                name="title"
                onChange={(e) => setTextHan(e)}
              />
              <TextField
                label="Description"
                multiline
                fullWidth
                variant="outlined"
                name="desc"
                minRows={4}
                onChange={(e) => setTextHan(e)}
                defaultValue={product.desc}
              />
              <TextField
                required
                label="Categories"
                variant="outlined"
                fullWidth
                defaultValue={product.categories.join(";")}
                name="categories"
                onChange={(e) =>
                  setProduct({
                    ...product,
                    [e.target.name]: e.target.value.split(";"),
                  })
                }
              />
              <TextField
                required
                label="Price"
                fullWidth
                variant="outlined"
                name="price"
                defaultValue={product.price}
                onChange={(e) => setTextHan(e, true)}
              />
            </div>
            <div className="right">
              <TextField
                select
                label="Optins"
                value={setting.option}
                onChange={(e) =>
                  changeOption(e)
                }
              >
                <MenuItem key={0} value={0}>
                Colors And Sizes
                </MenuItem>
                <MenuItem key={1} value={1}>
                Colors Only
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Other Options
                </MenuItem>
              </TextField>
              {
                setting.option !== 2 && (
              <>
              <div className="colors">
                <TextField select label="Colors" value={setting.color}
                  onChange={(e) =>setSetting({...setting, color: e.target.value})}
                >
                  {product.colors.map((c, ii) => (
                    <MenuItem key={c.name} value={ii}>
                      {c.name}
                    </MenuItem>
                  ))}
                </TextField>
                <IconButton aria-label="delete" size="large" onClick={addNewColor} >
                  <AddCircleOutline />
                </IconButton>
              </div>
                <div className="colors">
                  <TextField label="Color Name"  size="small" 
                    onChange={(e) =>ChangeColorName(e)}
                    value={product.colors[setting.color].name}
                  />

                  <IconButton aria-label="delete" size="large" onClick={deleteColor}>
                    <DeleteForever />
                  </IconButton>
                </div>
              {
                setting.option === 0 && (
              <div className="sizes">
                <TextField label="S"  type="number" value={product.colors[setting.color].sizes.s} size="small" name="s" onChange={(e) => ChangeSize(e)} />
                <TextField label="M" type="number" value={product.colors[setting.color].sizes.m} size="small" name="m" onChange={(e) => ChangeSize(e)}  />
                <TextField label="L" type="number" value={product.colors[setting.color].sizes.l} size="small" name="l" onChange={(e) => ChangeSize(e)} />
                <TextField label="XL" type="number" value={product.colors[setting.color].sizes.xl} size="small" name="xl" onChange={(e) => ChangeSize(e)}   />
                <TextField label="2XL" type="number" value={product.colors[setting.color].sizes.xxl} size="small" name="xxl" onChange={(e) => ChangeSize(e)}  />
              </div>

                )
              }
              </>
                )
              }
              <Button variant="contained" type="submit" endIcon={<Send />}>
              Save
              </Button>

            </div>
          </div>
        </Box>
      </>
    )
  );
}

export default Product;
