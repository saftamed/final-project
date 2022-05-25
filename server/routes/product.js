
const comment = require("../models/Comment");
const Product = require("../models/Product");
//product router
const productRouter = require("express").Router();

/************* M ****************/
let     multer = require('multer'),
 { v4: uuidv4 } = require('uuid');

const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});



/*****************************/


//search a PRODUCT
productRouter.get("/search/:key", async (req, res) => {
    try {
      const products = await Product.find({ title: { $regex:new RegExp(req.params.key, "i") } }).limit(10);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//GET PRODUCT
productRouter.get("/find/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);                                                
      const comments = await comment.find({productId:req.params.id}).populate("userId",'username').limit(10);                                                
      res.status(200).json({...product._doc,comments});
    } catch (err) {
      res.status(500).json(err);
    }
  });


//GET ALL PRODUCTS
productRouter.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
  
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        if(qCategory === "all"){
          products = await Product.find();
        }else{
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
        }
      } else {
        products = await Product.find().limit(10);
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });




  productRouter.post("/",upload.single('file'), async (req, res) => {
    var p = JSON.parse(req.body.product)
    p.img = req.file? req.file.filename:p.img
    const newProduct = new Product(p);
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //UPDATE
  productRouter.put("/:id",upload.single('file'), async (req, res) => {
    var p = JSON.parse(req.body.product)
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: {...p,img:req.file? req.file.filename:p.img},
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE
  productRouter.delete("/:id", async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });



  
  module.exports = productRouter;
