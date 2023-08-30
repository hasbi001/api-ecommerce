const { authjwt } = require("../middleware");
const controller = require("../controllers/userController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/testuser/all", controller.allAccess);

  app.get(
    "/api/testuser/user",
    [authjwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/testuser/mod",
    [authjwt.verifyToken, authjwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/testuser/admin",
    [authjwt.verifyToken, authjwt.isAdmin],
    controller.adminBoard
  );
};