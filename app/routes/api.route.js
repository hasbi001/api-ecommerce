const { verifyuser,authjwt } = require("../middleware");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
        );
        next();
    });

    // api auth  
    app.post(
        "/api/auth/signup",
        [
        verifyuser.checkDuplicateUsernameOrEmail,
        verifyuser.checkRolesExisted
        ],
        authController.signup
    );

    app.post("/api/auth/signin", authController.signin);

    app.post("/api/auth/signout", authController.signout);
    
    // api user 
    app.get("/api/testuser/all", userController.allAccess);

    app.get(
        "/api/testuser/user",
        [authjwt.verifyToken],
        userController.userBoard
    );

    app.get(
        "/api/testuser/mod",
        [authjwt.verifyToken, authjwt.isModerator],
        userController.moderatorBoard
    );

    app.get(
        "/api/testuser/admin",
        [authjwt.verifyToken, authjwt.isAdmin],
        userController.adminBoard
    );

    // api product
    app.post(
        "/api/product/list", 
        [authjwt.verifyToken],
        productController.findAll
      );
    
      app.post(
        "/api/product/create",
        [authjwt.verifyToken],
        productController.create
      );
    
      app.get(
        "/api/product/view/:id",
        [authjwt.verifyToken],
        productController.findOne
      );
    
    app.put(
        "/api/product/update/:id",
        [authjwt.verifyToken],
        productController.update
    );

    app.delete(
        "/api/product/delete/:id",
        [authjwt.verifyToken],
        productController.delete
    );

};