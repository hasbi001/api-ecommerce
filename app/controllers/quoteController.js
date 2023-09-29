const db = require("../models");
const Product = db.product;
const User = db.user;
const Quotes = db.quote;
const QuotesItems = db.quoteItems;
const Op = db.Sequelize.Op;
const logger = require("../helpers/writelog");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

// addtocart
exports.addtocart = async (req, res) => {
  let token = req.body.token;
  const payload = jwt.decode(token, config.secret);
  // res.send(payload);
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
    const user = await User.findOne({where:{id:payload.id}});
    const product = await Product.findOne({where:{id:req.body.productId}});
    let result = [];
    
    if (!user) {
        res.status(400).send({
            message: "user not found"
        });
        return;
    }
    
    try {
      
      const dataQuote = {
        userId: user.id,
        status: 1,
        createdAt: Y+"-"+m+"-"+d,
        updatedAt: Y+"-"+m+"-"+d,
      };
      let quote = await Quotes.findOne({where :{ userId:payload.id}});
      if (!quote) {
        const quotes = await Quotes.create(dataQuote);
        const dataItem = {
          quoteId: quotes.id,
          productId: req.body.productId,
          product_name: req.body.productName,
          price: product.price*req.body.quantity,
          quantity: req.body.quantity
        };
        const items = await QuotesItems.create(dataItem);
        result.push({quotes,items});
      }
      else
      {
        const dataItem = {
          quoteId: quote.id,
          productId: req.body.productId,
          product_name: req.body.productName,
          price: product.price*req.body.quantity,
          quantity: req.body.quantity
        };
        const items = await QuotesItems.create(dataItem);
        result.push({quote,items});
      }
      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Quote."
      });
    }
};

// Retrieve all Products from the database.
exports.findAll = async (req, res) => {
  try {
      const token = req.body.token;
      const payload = jwt.decode(token, config.secret);

      const quotes = await Quotes.findAll({ where: { userId: payload.id } });

      const result = [];

      for (const quote of quotes) {
          const items = await QuotesItems.findAll({ where: { quoteId: quote.id } });
          result.push({ quote, items });
      }

      res.send(result);
  } catch (err) {
      res.status(500).send({
          message: err.message || "Some error occurred while getting the list of transactions."
      });
  }
};


exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const token = req.body.token;
    const payload = jwt.decode(token, config.secret);

    const quotes = await Quotes.findOne({ where: { id: id } });

    const result = [];

    for (const quote of quotes) {
        const items = await QuotesItems.findAll({ where: { quoteId: quote.id } });
        result.push({ quote, items });
    }

    res.send(result);
} catch (err) {
    res.status(500).send({
        message: err.message || "Some error occurred while getting the list of transactions."
    });
}
};

