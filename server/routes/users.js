const userModel = require("../models/users.js");

function register(router) {

  router.get("/users", async function(req, res) {
    userModel.getAll(res);
  });

  router.post("/users", function(req, res) {
    const data = {
      nickname: req.body.nickname,
      password: req.body.password
    };
    userModel.create(data, res);
  });

  router.delete("/users/:nickname", function(req, res) {
  const nicknameSelected = req.params.nickname;
  userModel.delete(nicknameSelected, res);
});

  router.post("/users/login", (req, res) => {
    const data = {
      nickname: req.body.nickname,
      password: req.body.password,
    };

    userModel.login(data,req,res);
  });

  router.get("/login", (req, res) => {
    userModel.loginPage(req, res)
  })

  router.get("/logged", (req, res) => {
    userModel.loggedPage(req, res)
  })

  router.get("/logout", (req, res) => {
    userModel.logoutPage(req, res)
  })

  router.get("/register", (req, res) => {
    userModel.registerPage(req, res)
  })

  router.post("/users/register", (req, res) => {
    const data = {
      nickname: req.body.nickname,
      password: req.body.password,
    };

    userModel.register(data,req,res);
  });
}

module.exports = register;
