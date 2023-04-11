const { signUp, login } = require("./auth");

const router = require("express").Router();
const { validateSignUp, validateLogin } = require("./validation");
/************************
 * @Router /api/auth *
 ************************/

router.post("/signup", validateSignUp, signUp);

router.get("/login", validateLogin, login);

module.exports = router;
