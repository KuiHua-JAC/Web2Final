const express = require("express");
const { Session, createSession, getSession, deleteSession } = require("./session.js");
const res = require("express/lib/response.js");
const router = express.Router();
const routeRoot = "/session";
const cookieParser = require("cookie-parser");
const { checkCredentials } = require("../user/userController.js");

router.use(cookieParser());

/**Log a user in and create a session cookie that will expire in 2 minutes */
async function loginUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    //Validate the user's credentials against our data
    //If invalid, redirect to the main page withut creating a session cookie
    if (username && password) {
        if(await checkCredentials(username, password)) {
            console.log("Succeffully logged in user " + username);

            //Create a session object that will expire in 2 minutes
            const sessionId = createSession(username, 2);

            //Save the cookie that will expire
            res.cookie("sessionId", sessionId, { expires: getSession(sessionId).expiresAt, httpOnly: true });
        } else console.log("Unsuccefull login: Invalid username or password for the user " + username);
    } else console.log("Unsuccefull login: Empty username or password");

    res.redirect("/session");
}

function authenticateUser(request) {
    //If the request doesnt have any cookies, the user is not authenticated
    if (!request.cookies) {
        return null;
    }

    //We can obtain the session token from the requests cookies, which come with every request
    const sessionId = request.cookies["sessionId"];
    if(!sessionId){
        //If the cookie is not set, return null
        return null;
    }

    //Get the session of the user from the session map
    userSession = getSession(sessionId);
    if (!userSession) {
        return null;
    }

    //If the session has expired, delete it and return null
    if (userSession.isExpired()) {
        deleteSession(sessionId);
        return null;
    }

    return { sessionId: sessionId, userSession: userSession }; //Succeffully authenticated
}

function RefreshSession(request, response) {
    const authenticatedSession = authenticateUser(request);

    if (!authenticatedSession) {
        response.status(401).send("Unauthorized Access");
        return;
    }

    //Create and store a new Session object that will expire in 2 minutes
    const newSessionId = createSession(authenticatedSession.userSession.username, 2);

    //Delete the old entry in the session map
    deleteSession(authenticatedSession.sessionId);

    //Set the session ocolie to the new id we generated, with a renewed expiry time
    response.cookie("sessionId", newSessionId, { expires: getSession(newSessionId).expiresAt, httpOnly: true });

    return newSessionId;
}

function logoutUser(request, response) {
    const authenticatedSession = authenticateUser(request);

    if (!authenticatedSession) {
        response.status(401).send("Unauthorized Access");
        return;
    }

    //Delete the session from the session map
    deleteSession(authenticatedSession.sessionId);
    console.log("Logged out user " + authenticatedSession.userSession.username + " successfully");

    //Remove the session cookie
    response.cookie("sessionId", "", { expires: new Date(), httpOnly: true });
    response.redirect("/session");
    //response.send("Logged out user " + authenticatedSession.userSession.username + " successfully");
}

//TODO delete once session is working
function checkSession(request, response) {
    const authenticatedSession = authenticateUser(request);
    if (!authenticatedSession) {
      response.status(401).send("Unauthorized Access");
      return;
    }
  
    RefreshSession(request, response)
    console.log("User " + authenticatedSession.userSession.username + " is logged in");
    response.status(200).send("User " + authenticatedSession.userSession.username + " is logged in");
  }

router.post("/login", loginUser);
router.get("/logout", logoutUser)
router.get("/", checkSession);

module.exports = { router, routeRoot, loginUser, authenticateUser, RefreshSession };
