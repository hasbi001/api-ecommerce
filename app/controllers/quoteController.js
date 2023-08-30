const db = require("../models");
const Product = db.product;
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
    let result = [];

    if (!user) {
        res.status(400).send({
            message: "user not found"
        });
        return;
    }
    const dataQuote = {
        userId: user.id,
        status: req.body.sku,
        createdAt: Y+"-"+m+"-"+d,
        updatedAt: Y+"-"+m+"-"+d,
    };

    Quotes.create(dataQuote)
    .then(data => {
       result.push(data); 
      QuotesItems.create({
        quoteId: data.id,
        productId: req.body.productId,
        product_name: req.body.productName,
        price: req.body.price,
        quantity: req.body.quantity
      })
      .then(item => {
        result.push(item);
        res.send(result);
      })
      .catch({
        
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
    
    const name = req.body.name;
    logger.writeToLog(name);
    var condName = name ? { name: { [Op.like]: `%${name}%` } } : null;
    const sku = req.body.sku;
    var condSku = sku ? { sku: { [Op.like]: `%${sku}%` } } : null;
    var condition;
    
    if (condName != null || condSku != null) {
        condition = {
            [Op.or]: [
                condName,
                condSku
            ]
        }
    }

    Product.findAll({ where: condition
        }).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving products."
            });
        });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Product with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Product with id=" + id
        });
      });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Product.update(req.body, {
        where: { id: id }
    })
    .then(num => {
    if (num == 1) {
        res.send({
            message: "Product was updated successfully."
        });
    } else {
        res.send({
            message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
    }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Product with id=" + id
        });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Product.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Product was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Product with id=" + id
        });
      });
};
