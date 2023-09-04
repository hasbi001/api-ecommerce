const db = require("../models");
const Product = db.product;
const User = db.user;
const Quotes = db.quote;
const QuotesItems = db.quoteItems;
const Op = db.Sequelize.Op;
const logger = require("../helpers/writelog");

// addtocart
exports.addtocart = (req, res) => {
   // Validate request
   if (!req.body.productId) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    const today = new Date();
    const Y = today.getFullYear();
    let m = today.getMonth() + 1; // Months start at 0!
    let d = today.getDate();
    const user = User.findByPk(req.userId);
    const product = Product.findByPk(req.body.productId);
    let result = [];

    if (!user) {
        res.status(400).send({
            message: "user not found"
        });
        return;
    }
    const dataQuote = {
        userId: user.id,
        status: 1,
        createdAt: Y+"-"+m+"-"+d,
        updatedAt: Y+"-"+m+"-"+d,
    };

    Quotes.create(dataQuote)
    .then(data => {
       result['quote'] = data; 
      QuotesItems.create({
        quoteId: data.id,
        productId: req.body.productId,
        product_name: req.body.productName,
        price: product.price*req.body.quantity,
        quantity: req.body.quantity
      })
      .then(item => {
        result['item']=item;
        res.send(result);
      })
      .catch(errs=>{
        res.status(500).send({
          message:
            errs.message || "Some error occurred while creating the Quote."
        });
      });
      
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Quote."
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    let result = [];
    Quotes.findAll({where:{ userId: req.userId }}).
    then(data =>{
      data.forEach((value) => {
        const item = QuotesItems.findAll({where: {quoteId:value.id}});
        result.push([value,item]);
      });
      res.send(result);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while get list transaction."
      });
    });
};

