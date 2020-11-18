require("dotenv").config()
const express = require("express")
const app = express()
const port = 3000


const bodyParser = require("body-parser")
//get the body parser

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// allows to process data from the url and json


const cors = require("cors")
app.use(cors())

const bcrypt = require("bcrypt")



const mongoose = require("mongoose")
const password = process.env.PASSWORD
const dbname = process.env.DBNAME1
//console.log(dbname)
const dbURI = process.env.URI
//console.log(process.env.PASSWORD)
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
    console.log("Connected to Database")
}).catch((err => console.log(err + "THIS IS THE ERROR")))





// app.use((req,res)=> {
//     UserModel.find().then(data => console.log(data))
// })

let products = []
let users = []
let user = null


const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const UserModel = mongoose.model("User", userSchema) //para1 = collection Name, para2 = schema

const productSchema = Schema({
    images: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    for: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    color: {
        type: Array,
        required: true
    },
    details: {
        type: Object,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        required: false
    },
    reviews: {
        type: Array,
        required: true
    }
}, {timestamps: true})

const ProductModel = mongoose.model("Product", productSchema)

// const product = new ProductModel({
//     images: ["https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/oplkqwyf7nwnj98f8agj/air-force-1-07-shoe-DS3Q3T.jpg", 
//     "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/jel4umo7a79pwbvfnjxo/air-force-1-07-shoe-DS3Q3T.jpg",
//     "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/xe4ixhngvldmla3hnoik/air-force-1-07-shoe-DS3Q3T.jpg",
//     "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/e2omtc8v6jq5sfa6v8vo/air-force-1-07-shoe-DS3Q3T.jpg",
//     "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/v9o0gettihexwtvtfyvb/air-force-1-07-shoe-DS3Q3T.jpg",
//     "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/vlb4esbkxaf6ihop32yg/air-force-1-07-shoe-DS3Q3T.jpg",
//     "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/ajtqq4ljero7kyeketie/air-force-1-07-shoe-DS3Q3T.jpg"],
//     title: "Nike Air Force 1 '07'",
//     for: "Men",
//     details: {
//         description: "Hoops in the park, Sunday BBQs and sunshine. The radiance lives on in the Nike Air Force 1 '07, the b-ball OG that puts a fresh spin on the features you know best: crisp leather, stitched overlays in classic all white and the perfect amount of flash to make you shine.",
//         benefits: [
//           'Full-grain leather in the upper adds a premium look and feel.',
//           'Originally designed for performance hoops, Nike Air cushioning adds lightweight, all-day comfort.',
//           'The padded low-cut collar looks sleek and feels great.'
//         ],
//         materials: [
//           'Foam midsole',
//           "Metal 'AF-1' dubrae",
//           'Perforations on the toe',
//           'Rubber sole',
//           'Colour Shown: Black/Black',
//           'Style: 315122-001'
//         ],
//         origins: 'Debuting in 1982, the AF-1 was the first basketball shoe to house Nike Air, revolutionising the game while rapidly gaining traction around the world. Today, the Air Force 1 stays true to its roots with the same soft and springy cushioning that changed sneaker history.'
//       },
//     color: ["Black/Black", 2],
//     type: "Shoe",
//     price: 84.95,
//     featured: true
// })

const product = new ProductModel({  images: ["https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/e5e60119-95e2-47e8-abc6-bd4c2a4772cc/sportswear-older-tracksuit-3qXxgm.jpg",
    "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/976e0ceb-5b25-4bd0-9b85-eda7956ef1f6/sportswear-older-tracksuit-3qXxgm.jpg",
    "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/7e49d951-6d93-4594-bfc2-56a750c3679c/sportswear-older-tracksuit-3qXxgm.jpg",
    "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/2dbf363a-62a9-48fb-b1de-c3ef0464dbc6/sportswear-older-tracksuit-3qXxgm.jpg",
    "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/45b07613-8101-4fd7-a751-ed678864b56b/sportswear-older-tracksuit-3qXxgm.jpg",
    "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/83a6b039-0743-41ff-8891-9a120e41347c/sportswear-older-tracksuit-3qXxgm.jpg",
    "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/fde2acb6-1792-465d-b697-e801d346f309/sportswear-older-tracksuit-3qXxgm.jpg",
    "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/084ab5c3-aa7a-495b-b8c4-ffd93819eaaf/sportswear-older-tracksuit-3qXxgm.jpg",
"https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/66660bf9-3b37-4f1e-b5f5-8fa2a2e3b8f3/sportswear-older-tracksuit-3qXxgm.jpg",
"https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/cc61b321-03e8-4b9b-81c4-b7c6e395a3dd/sportswear-older-tracksuit-3qXxgm.jpg",
"https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/24d92286-2c15-4814-ba00-5b6d0fe449ed/sportswear-older-tracksuit-3qXxgm.jpg"],
    title: "Nike Sportswear",
    for: "Older Kids",
    details: {
        title: "A CLASSIC TRACKSUIT FOR KIDS.",
        description: " Throw it back with the Nike Sportswear Tracksuit. This classic combo has a versatile jacket and trousers that can be worn together or separately. Soft and comfy, it also has big logo stripes down the sides for signature Nike style.",
        benefits: ["Lightweight Coverage Fabric is soft and lightweight so you can stay comfy.",
"Versatile Style Mix and match your jacket and trousers with these separates."],
        materials: ["Standard fit for a relaxed, easy feel",
        "Jacket: Front pockets", 
"Jacket: Full-zip design", 
"Trousers: Elastic waistband with drawcord",
 "Body: 100% polyester. Rib: 97% polyester/3% elastane.",
 "Machine wash",
"Imported",
        "Style: CU8374-010"],
        origins: null
    },
    color: ["Black/White", 2],
    type: "Tracksuit",
    price: 42.95,
    featured: true
})


// product.save()
console.log("saved")

// ProductModel.findOne({for: "Women"}).then(doc => {
//     doc.subImages.forEach(a => console.log(a))
// })



UserModel.find().then(data => {
    //console.log(data + "dataaaaaaaaaaaaaa")
    users = [...data]
})
//getting all users


// app.use((req, res, next)=> {
//     // UserModel.find().then(data => console.log(data))

//     res.json(user)
//     next()

// })


app.get("/products", (req, res) => {
    ProductModel.find().then(data => {
        products = [...data];
        res.send(products)
    })
    console.log("producttttttttttttttttttttttttttttttt")
})
// ProductModel.find({title: "Nike Air Force 1 '07"}).then(docs => {
//     console.log(docs + "4docccccccccccccccccccccccccccccccccccccccc")
// }).catch(err => console.log(err))

app.get("/shop/mens", (req, res) => {
    console.log("helllo")
    ProductModel.find({for: "Men"}).then(docs => {
        console.log(docs + "4docccccccccccccccccccccccccccccccccccccccc")
        res.send(docs)
    }).catch(err => console.log(err))
    
})

app.post("/signUp", (req, res)=> {
    console.log(req.body.password, req.body.email)
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    //searching for a user with an email property in the database
    UserModel.findOne({email: email}).then(doc => {

        //checking if user with that email exists
        if (doc){
            //console.log("User With This Email Already Exists")
            res.send("A User With This Email Already Exists")
        }

        else{

            //hash the password so its secure and then save to database using user model
            const hashedPassword = bcrypt.hash(password, 10).then(data => {
                // console.log(`hashed password ${data}`)
                const User = new UserModel({
                    username: username,
                    email: email,
                    password: data
                })
        
                console.log(User + "userprom")
                
                
                User.save()
        
                
        
            }).catch(err => console.log(err + "error"))

        }

    })

    // let userExists = users.find(a => a.email === email);

        
    
})


//sign in route
app.post("/signIn", (req, res)=> {
    const email = req.body.email
    const password = req.body.password
    console.log(email,password)


    //checking if a user with that email address exists
    UserModel.findOne({email: email}).then(doc => {
        // console.log(doc + "docccccccccccccccccccccccccccccccccccccccccccc")
        


        //if user exists
        if (doc){
            console.log("User does exist")
            
            //use bcrypt to compare the stored user hash password with the text password
            bcrypt.compare(password, doc.password).then(data => {
                console.log(data)
                
                if (data){
                    console.log("password does match")
                    user = doc
                    res.send(user)
                }

                else{
                    console.log("password doesnt match")
                }
            })
        }
    
        else{
            console.log("User does not exist")
    
            res.send("A User With This Email Does Not Exist")
        }
    



    })


})




//39

//h , h@h, hh

app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));