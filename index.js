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
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    },
    favouriteProduct: {
        type: Array,
        required: true
    },
    orders: {
        type: Array,
        required: true
    },
    confirmationCode: {
        type: Object,
        required: true
    },
    confirmed:{
        type: Boolean,
        required: true
    },
    createdAt:{
        type: Date,
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


app.get("/products/all", (req, res) => {
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

app.get("/shop/womens", (req, res) => {
    console.log("helllo")
    ProductModel.find({for: "Women"}).then(docs => {
        console.log(docs + "womeennnnnnnnnnnnnnnnn4docccccccccccccccccccccccccccccccccccccccc")
        res.send(docs)
    }).catch(err => console.log(err))
    
})

app.get("/shop/kids", (req, res) => {
    console.log("helllo")
    ProductModel.find().then(docs => {
        console.log(docs + "kidddddddddddddsssssssssssssssssss4docccccccccccccccccccccccccccccccccccccccc")
        res.send(docs)
    }).catch(err => console.log(err))
    
})

app.post("/signUp", (req, res)=> {
    console.log(req.body.password, req.body.email)
    const {firstName, lastName, email, password} = req.body

    //searching for a user with an email property in the database
    UserModel.findOne({email: email}).then(doc => {

        //checking if user with that email exists
        if (doc){
            console.log("User With This Email Already Exists")
            res.send({message: "A User With This Email Already Exists"})
        }

        else{

            //hash the password so its secure and then save to database using user model
            bcrypt.hash(password, 10).then(data => {
                // console.log(`hashed password ${data}`)
                const options = "abcdefghijklmnopqrstuvwxyz0123456789"
                let code = ""
                while (code.length < 50){
                    code+= options[Math.floor(Math.random() * options.length)]
                }

                console.log(code + "=code")
        
                const User = new UserModel({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: data,
                    favouriteProduct: [],
                    orders: [],
                    confirmationCode: {
                        value: code,
                        createdAt: new Date().getTime()
                    },
                    confirmed: false,
                    createdAt: new Date()
                })
        
                console.log(User + "userprom")
                
                
                User.save()
                user = User

                let transporter = nodemailer.createTransport({
                    service: "Outlook",
                  //   port: 587,
                  //   secure: false, // true for 465, false for other ports
                    auth: {
                      user: process.env.USER, // generated ethereal user
                      pass: process.env.PASS, // generated ethereal password
                    },
                  });
                
                  // send mail with defined transport object
                  let info = transporter.sendMail({
                    from: `<${process.env.USER}>`, // sender address
                    to: email, // list of receivers
                    subject: "Confirmation Code", // Subject line
                  //   text: "Hello world? said galactus", // plain text body
                    html: `<b><p>This Code Will Expire In 5 Minutes. If The Code Has Expired, Please Request For A New One.</p>
                    <p>Confirmation Code:${code}</p></b>`, // html body
                  }).then(dataa => {
                      
                      res.send({message: "Account Has Been Created. Please Confirm Email To Access Account", user: user})
                      console.log("Message sent: %s", dataa.messageId);
                  }).catch(err => console.log(err))

                
        
                
        
            }).catch(err => console.log(err + "error"))

        }


    })


    
    // let userExists = users.find(a => a.email === email);

        
    
})


// app.post("/confirmation", (req, res) => {
//     const {currentUser, attemptedConfirmation} = req.body
//     UserModel.findOne({email: currentUser.email}).then(doc => {
//         console.log(attemptedConfirmation)
//         if (doc.confirmationCode === attemptedConfirmation){
//             doc.confirmed = true
//             doc.save()
//             user = doc
//             res.send(doc)
//             console.log("code is true")
//         }

//         else{
//             console.log("code is false")
//         }

//         console.log("confirmmmconfirmmmmmmmmmmmmmmmmmmmmm")
//     })
    
// })

app.post("/confirmation", (req, res) => {
    const {currentUser, attemptedConfirmationCode, attemptedDate} = req.body
    console.log(currentUser)
    UserModel.findOne({email: currentUser.email}).then(doc => {
        console.log(attemptedConfirmationCode)
        console.log(attemptedDate - doc.confirmationCode.createdAt)
        if (doc.confirmationCode.value === attemptedConfirmationCode && (attemptedDate - doc.confirmationCode.createdAt) < 300000){
            doc.confirmed = true
            doc.save()
            user = doc
            res.status(200).send({
                message: `Thank You ${user.firstName} ${user.lastName}, Your Account Has Been Confirmed. Enjoy!`,
                user:doc})
            console.log("code is true")
        }

        else{

            res.status(200).send({message: "This Confirmation Code Is Either Expired or Incorrect"})
            console.log("code is false")
        }

        console.log("confirmmmconfirmmmmmmmmmmmmmmmmmmmmm")
    })
    
})


app.post("/resendConfirmationCode", (req, res) => {
    const {email} = req.body
    UserModel.findOne({email: email}).then(doc => {
        const options = "abcdefghijklmnopqrstuvwxyz0123456789"
                let oldCode = doc.confirmationCode.value
                let newCode= ""

                while (newCode.length < 50){
                    newCode+= options[Math.floor(Math.random() * options.length)]
                    oldCode.split("").splice(0,41).join("")
                    if (newCode.length === 40 && newCode === oldCode){
                        newCode = []
                    }
                }

                doc.confirmationCode = {
                    value: newCode,
                    createdAt: new Date().getTime()
                }
                user = doc
                doc.save()
                console.log("code has been resent")


                let transporter = nodemailer.createTransport({
                    service: "Outlook",
                  //   port: 587,
                  //   secure: false, // true for 465, false for other ports
                    auth: {
                      user: process.env.USER, // generated ethereal user
                      pass: process.env.PASS, // generated ethereal password
                    },
                  });
                
                  // send mail with defined transport object
                  let info = transporter.sendMail({
                    from: `<${process.env.USER}>`, // sender address
                    to: email, // list of receivers
                    subject: "New Confirmation Code", // Subject line
                  //   text: "Hello world? said galactus", // plain text body
                    html: `<b><p>This Code Will Expire In 5 Minutes. If The Code Has Expired, Please Request For A New One.</p>
                    </p>Confirmation Code:${newCode}</p></b>`, // html body
                  }).then(dataa => {

                    res.send({message: `The Confirmation Code Has Been Resent To The Email: ${user.email}`, user:doc})
                      
                      console.log("Message sent: %s", dataa.messageId);
                  }).catch(err => console.log(err))

    }).catch(err => `This is the resend Confirmation code error: ${err}`)
})


app.post("/toggle-favourites", (req,res) =>{


    const {title, color, size} = req.body


    if (user){
        const {email} = user
        console.log(email)

        UserModel.findOne({email: email}).then(doc =>{

            let {favouriteProduct} = doc
    
            let exists = favouriteProduct.find(favourite => favourite.title === title && favourite.color === color && favourite.size === size)
    
            if (exists){
                doc.favouriteProduct = favouriteProduct.filter(favourite => favourite !== exists)
                doc.save()
            }
    
            else{
                doc.favouriteProduct = [...favouriteProduct, req.body]
                doc.save()
            }

            res.send(doc)

            
    
    
    
        })

        console.log("user exists")
    }

    else{
        console.log("user doesnt exist")
    }
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
                    res.status(200).send({message:`Welcome ${user.firstName} ${user.lastName}` , user:user})
                }

                else{
                    res.status(200).send({message: "Password Does Not Match. Please Try Again"})
                    console.log("password doesnt match")
                }
            })
        }
    
        else{
            console.log("User does not exist")
    
            res.status(200).send({message:"A User With This Email Does Not Exist"})
        }
    



    })


})

app.put("/signOut", (req,res) => {
    user = null
    res.send({user})
    console.log("signed out")

})

app.put("/settings/change/password", (req, res) => {

    const {currentUser, currentPassword, newPassword} = req.body

    UserModel.findOne({email: currentUser.email}).then(doc => {
        console.log(doc + "user does exist")
        bcrypt.compare(currentPassword, doc.password).then(result => {
            if (result){
                bcrypt.hash(newPassword, 10).then(hashedPassword => {
                    console.log("password changed")
                    doc.password = hashedPassword
                    doc.save()
                    res.status(200).send({message: "Your Password Has Been Updated", user: doc})
                })

            }

            else{
                res.status(200).send({message: "Current Password Is Input Does Not Match The Current Password Of This Account"})
            }

        }).catch(err => console.log(err))
    
    }).catch(err => console.log(err))

})

app.put("/settings/change/email", (req, res) => {

    const {currentUser, email} = req.body

    console.log(email)

    console.log(user.email)
    

    UserModel.findOne({email: currentUser.email}).then(doc => {


        doc.email = email
        user = doc
        doc.save()
        res.status(200).send({message: "Your Email Has Been Updated", user: doc})
        
    
    }).catch(err => console.log(err))

})

app.delete("/deleteAccount", (req, res)=> {
    UserModel.deleteOne({email: user.email}).then(doc => {
        user = null
        res.send({status:200, currentUser: null})

    })
})




app.get("/", (req, res) =>{
    res.send("hello world")
})

app.get("/shop/all/shoes", (req, res) => {
    ProductModel.find({type: "Shoe"}).then(data => {
        res.send(data)
        console.log("data for all shoes is sent")

    }).catch(err => console.log(`The error for all shoes route: ${err}`))

})

app.get("/shop/all/clothing", (req, res) => {
    ProductModel.find({type: {$ne: "Shoe"}}).then(data => {
        res.send(data)
        console.log(data)
        console.log("data for all clothing is sent")

    }).catch(err => console.log(`The error for all clothing route: ${err}`))

})

app.get("/shop/all/featured", (req, res) => {
    ProductModel.find({featured: true}).then(data => {
        res.send(data)
        console.log("data for all shoes is sent")

    }).catch(err => console.log(`The error for all shoes route: ${err}`))

})

const stripe = require("stripe")(process.env.STRIPEKEY)
app.post("/payment", (req, res)=>{
    const {token, amount, newOrder} = req.body
    console.log(token)
    const body = {
        source: token.id,
        amount: amount,
        currency: "GBP"
    }

    console.log('payment request')

    stripe.charges.create(body, (stripeErr, stripeRes)=> {

        if (stripeErr){
            res.status(500).send({error: stripeErr})
        }

        else{
            console.log(user + "userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
            
            if (user){
                
            UserModel.findOne({email : user.email}).then(doc => {
                
                const {orders} = doc

                doc.orders = [...orders, {...newOrder, dispatchTo: `${user.firstName} ${user.lastName}`}]
                user = doc
                doc.save()
                res.status(200).send({success: stripeRes, user: doc})
            })
        }

        else{
            res.status(200).send({success: stripeRes, user: user})

        }

                
        }
    })

})



//39

//h , h@h, hh
const nodemailer = require("nodemailer")

const main = ()=> {
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "Outlook",
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = transporter.sendMail({
      from: `<${process.env.USER}>`, // sender address
      to: "yspqhfjdwarywjvlik@twzhhq.online", // list of receivers
      subject: selectedService !== "Other" ? selectedService : "", // Subject line
    //   text: "Hello world? said galactus", // plain text body
      html: `<b>
      <li>${firstName}</li>
      <li>${SecondName}</li>
      <li>${email}</li>
      <li>${phone}</li>
      <li>${selectedService}</li>
      <li>${message}</li></b>`, // html body
    }).then(data => {
        
        console.log("Message sent: %s", data.messageId);

        transporter.sendMail({
            from: `<${process.env.USER}>`, // sender address
            to: email, // list of receivers
            subject: `Automatic Reply: ${selectedService !== "Other" ? selectedService : ""}`, // Subject line
            // text: "Hello world? said galactus", // plain text body
            html: `<b>Hello ${firstName, secondName} , Your email has been received.  We will respond to your email within 5 working days. Thank you for your understanding.</b>`, // html body
          }).then(data => data).catch(err => console.log(err))

    }).catch(err => console.log(err));
  console.log(info)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  app.post("/contact-us", (req, res) => {
    console.log(req.body)
    const {firstName, lastName, email, phone, message, selectedService} = req.body
    console.log(selectedService)
    let transporter = nodemailer.createTransport({
        service: "Outlook",
      //   port: 587,
      //   secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.USER, // generated ethereal user
          pass: process.env.PASS, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
     transporter.sendMail({
        from: `<${process.env.USER}>`, // sender address
        to: "yspqhfjdwarywjvlik@twzhhq.online", // list of receivers
        subject: selectedService !== "Other" ? selectedService : "", // Subject line
      //   text: "Hello world? said galactus", // plain text body
        html: `<b>
        <li>FirstName: ${firstName}</li>
        <li>LastName: ${lastName}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
        <li>SelectedService: ${selectedService}</li>
        <li>Message: ${message}</li></b>`, // html body
      }).then(data => {
          
          console.log("Message sent: %s", data.messageId);
  
          transporter.sendMail({
              from: `<${process.env.USER}>`, // sender address
              to: email, // list of receivers
              subject: `Automatic Reply: ${selectedService !== "Other" ? selectedService : ""}`, // Subject line
              // text: "Hello world? said galactus", // plain text body
              html: `<b>Hello ${firstName, lastName} , Your email has been received.  We will respond to your email within 5 working days. Thank you for your understanding.</b>`, // html body
            }).then(data => {
                res.status(200).send({message: "Your Form Has Been Submitted"})
                return data
            }).catch(err => res.status(502).send({message: "There Has Been An Unexpected Error, Please Try Again"}))
  
      }).catch(err => console.log(err));
    
})
//   main().catch(console.error);



app.get("/products/:id", (req, res)=> {
    console.log(req.params.id + "titleeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

    ProductModel.findOne({_id: req.params.id}).then(doc => {
        console.log(doc)
        res.status(200).send(doc)
        console.log(doc, req.params.id + "heloooooooooooooooooooooooo")
        console.log(Array.isArray(doc))
    }).catch(err => {
        res.status(404).send()
    })


})

  
app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));