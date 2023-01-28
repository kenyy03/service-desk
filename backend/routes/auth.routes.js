const { Router } = require("express");
const controller = require("../controllers/user.auth.controller");
const verifySignUp = require("../middleware/verify.sign.up")
const verifySignIn = require("../middleware/verify.sign.in")
const app = Router();

app.post( 
    "/api/login",
    [
        verifySignIn.verifyRequiredFields
    ], 
    controller.login
);

app.post( 
    "/api/register",
    [
        verifySignUp.verifyIfUserExist, 
        verifySignUp.verifyRequiredFields
    ],
    controller.register
);

module.exports = app;

