const express = require("express");
const {Session, createSession, getSession} = require("./session.js");
const router = express.Router();
const routeRoot = "/session";

/**Log a user in and create a session cookie that will expire in 2 minutes */
function loginUser(req, res) {
    const username = "joe";

    const sessionId = createSession(username, 2);

    //save cookie that will expire
    res.cookie("sessionId", sessionId, {expires: getSession(sessionId).expiresAt, httpOnly: true});
    res.redirect("/");
}

function authenticate(request) {
    //If this request doesn't have a cookie, it's not authenticated
    if (!request.cookies) {
        return null;
    }

    // We can obtain the session token from the request cookie, which comes with every request
    const sessionId = request.cookies["sessionId"];

    if(!sessionId) {
        //if the cookie is not set, return null
        return null;
    }
}

router.get("/login", loginUser);

module.exports = {router, routeRoot, loginUser};
