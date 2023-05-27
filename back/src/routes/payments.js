const { Router } = require("express");
const server = Router();
const stripe = require('stripe')('sk_test_51NBkBJFPcDe3Fz6KjLlzjI35wfptX5dwAkeq7TnXdPy9YEBmqirmm4YdUIktaK82RmXCH8WU1dxyp6cR5G6CbMMM00zSOxlAwo');



server.post('/create_checkout',async (req,res)=>{
    const {name, benefits, price}=req.body;
    //aca customer probablemente sea el token del usuario loggeado por lo que habria que usar jwt para decodificar y sacar su email
    const customer = "Admin2@gmail.com"
    const charge=Number(price)*100;
    console.log(charge);
    const session=await stripe.checkout.sessions.create({
        //aca el valor de customer email deberia ser, efectivamente el email una vez sacado del token
        customer_email:customer,
        line_items:[{
            price_data:{
                currency: "USD",
                product_data:{
                    name:name,
                    description:benefits,
                },
                unit_amount:charge,
            },
            quantity: 1
        }],
        mode:'payment',
        success_url: 'http://localhost:3000/clases',
        cancel_url:'http://localhost:3000/sedes'
    });
    
    res.status(200).json({redirect_url:session.url});
    
});

module.exports = server;