const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },


    colors: [{ 
        name: { type: String },
        sizes: {
            s: { type: Number },
            m: { type: Number },
            l: { type: Number },
            xl: { type: Number },
            xxl: { type: Number }
        }
     }],

     options: [{
        name: { type: String },
        option: {
            type:Object
        }
    }],

    rating: { type: Number, default: -1 },
    numbreOfRatings: { type: Number, default: 0 },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);


/*

{
    "title":"iphone 13 max pro",
    "desc":"lkvfkokpo",
    "img":"fk.jpg",
    "categories":[
        "fff","phone","apple"
    ],
    "price":1500,
    "colors":[
        {
            "name":"red",
            "sizes":{
                "s":20,
                "m":10,
                "l":40,
                "xl":30,
                "xxl":50
            }
        },{
            "name":"black",
            "sizes":{
                "s":200,
                "m":100,
                "xl":300,
                "xxl":500
            }
        }
    ]
}

*/