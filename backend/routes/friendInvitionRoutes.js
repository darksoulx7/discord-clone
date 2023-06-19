const express = require("express");
const router = express.Router();
const friendInvitationControllers = require("../controllers/friendInvitation/friendInvitationControllers");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");

const postFriendInvitionSchema = Joi.object({
    targetMailAddress: Joi.string().email().required(),
});

router.post("/invite", auth, validator.body(postFriendInvitionSchema), friendInvitationControllers.controllers.postInvite)

module.exports = router;