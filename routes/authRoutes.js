const router = require("express").Router();
const {
  createUser,
  create_user_view,
  login_user,
  login_view,
  getUser,
  logout,
} = require("../controllers/userController");

router.post("/auth/signup", createUser);
router.get("/auth/register", create_user_view);

router.post("/auth/login", login_user);
router.get("/auth/login", login_view);
router.get("/logout", logout);
router.get("/profile/:id", getUser);

module.exports = router;
