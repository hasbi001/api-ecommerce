const { authjwt } = require("../middleware");
const controller = require("../controllers/productController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/product/list/:name/:sku", 
    [authjwt.verifyToken],
    controller.findAll
  );

  app.post(
    "/api/product/create",
    [authjwt.verifyToken],
    controller.create
  );

  app.get(
    "/api/product/view/:id",
    [authjwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/product/update/:id",
    [authjwt.verifyToken],
    controller.update
  );
};